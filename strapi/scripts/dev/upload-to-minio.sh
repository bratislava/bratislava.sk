#!/usr/bin/env bash
# Uploads a file to the MinIO bucket and prints the fields for a media-library migration
# (database/migrations/*.register-manually-uploaded-files.js).
#
# Needs MINIO_ACCESS_KEY and MINIO_SECRET_KEY in the environment, e.g.
#   set -a && . ./.env.local && set +a && ./scripts/upload-to-minio.sh ./big-file.pdf
set -euo pipefail

# bucket coordinates - fixed, dev, staging and prod share one bucket (kubernetes/base/.env), and `upload` is the
# provider's rootPath (config/env/production/plugins.ts)
ENDPOINT=https://s3.bratislava.sk
PUBLIC_ENDPOINT=https://bratislavask.s3.bratislava.sk
BUCKET=bratislavask
PREFIX=upload

# the file to upload, plus the credentials it takes to do so
file=${1:?usage: upload-to-minio.sh FILE}
[[ -f $file ]] || { echo "No such file: $file" >&2; exit 1; }
: "${MINIO_ACCESS_KEY:?}" "${MINIO_SECRET_KEY:?}"

# mc reads the alias from this env var, so nothing is written to ~/.mc/config.json; jq url-encodes the keys
export MC_HOST_upload_to_minio="${ENDPOINT/:\/\//://$(jq -rn --arg v "$MINIO_ACCESS_KEY" '$v|@uri'):$(jq -rn --arg v "$MINIO_SECRET_KEY" '$v|@uri')@}"
target=upload_to_minio/$BUCKET

# split the name the way Strapi does - a leading dot is a dotfile, not an extension
name=$(basename "$file")
ext=".${name##*.}"; [[ $name == *.* && $name != .* ]] || ext=""
# slugify like Strapi does, then add a random suffix so a key is never reused
slug=$(printf '%s' "${name%"$ext"}" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null \
  | sed -e 's/[^A-Za-z0-9._-]/_/g' -e 's/__*/_/g' -e 's/^_//' -e 's/_$//')
# hash + ext must recompose the key, the aws-s3 provider deletes by that, not by url
hash="${slug}_$(openssl rand -hex 5)"
key="$PREFIX/$hash$ext"

# never overwrite - the bucket is shared with production
mc stat "$target/$key" >/dev/null 2>&1 && { echo "Key already exists: $key" >&2; exit 1; }
# store the same content type that gets reported below
mime=$(file --mime-type -b "$file")
mc cp "$file" "$target/$key" --attr "Content-Type=$mime"

# file size, macOS first, then Linux
bytes=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
# the fields of a `filesToRegister` entry, size in kilobytes as Strapi stores it
cat <<REPORT

  name:     $name
  hash:     $hash
  ext:      $ext
  mime:     $mime
  size:     $(awk -v b="$bytes" 'BEGIN{printf "%.2f", int(b/1000*100+0.5)/100}')   # KB, bytes/1000
  url:      $PUBLIC_ENDPOINT/$key
  provider: aws-s3
REPORT
