import { GetServerSideProps } from 'next';
import { DocumentListFragment } from '@bratislava/strapi-sdk-homepage';

export const arrayify = (input: string | string[] | undefined | null) => {
  if (input === undefined || input === null) {
    return [] as undefined[];
  }
  if (typeof input === 'string') return [input];
  return input;
};

export const fileCountVzns = (data: any) => {
  let count = 0;
  if (data?.mainDocument?.url) {
    count += 1;
  }
  if (data?.amedmentDocument) {
    count += data?.amedmentDocument.length;
  }
  if (data?.cancellationDocument) {
    count += data?.cancellationDocument.length;
  }
  if (data?.consolidatedText) {
    count += 1;
  }
  return count;
};

export const isPresent = <U>(a: U | null | undefined | void): a is U => {
  if (a === null || a === undefined) return false;
  return true;
};

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type PageProps<T extends GetServerSideProps> = Extract<
  Awaited<ReturnType<T>>,
  { props: Record<string, unknown> }
>['props'];

// TEMP fix for build step where tokenized var isn't replaced until we figure out a better way
export const shouldSkipStaticPaths = () =>
  process.env.NODE_ENV === 'development' ||
  process.env.STRAPI_URL === '%{STRAPI_URL}%';
