
export type PaginateData<T> = {
  list: T[];
  metadata: {
    count: number;
    userTotalCount?:number;
    hasNextPage: boolean;
    cursor: { id: string; createdAt: number } | undefined;
  };
};
