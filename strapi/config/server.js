module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1338),
  app: {
    keys: env.array('APP_KEYS'),
  },
})

//test////////////////////'//'/.,mdjfmm.m,jm,,jmllmkdl
