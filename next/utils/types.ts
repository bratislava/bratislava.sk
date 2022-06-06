export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

// with these props. the page component is never rendered so they can be excluded from expected FE props
// void included for 401 basicAuth response
export type NextRedirectServerSideProps =
  | {
      redirect: {
        destination: string;
        permanent: boolean;
      };
    }
  | { notFound: boolean }
  | void;

// tends to work better then GetServerSidePropsResult - gives you inferred props only for when the page component actually renders
// use as follows: AsyncServerProps<typeof getServerSideProps>
// getServerSideProps needs to be declared as async - which it tends to be, add a sync version if you need it
export type AsyncServerProps<
  T extends (
    ...args: any
  ) => Promise<NextRedirectServerSideProps | { props: any }>
> = Exclude<Awaited<ReturnType<T>>, NextRedirectServerSideProps>['props'];
