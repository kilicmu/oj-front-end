export namespace Store {
  // export enum contestType {
  //     io,
  //     test
  // }

  enum problemLevel {
    easy = 1,
    medium,
    hard,
  }

  interface RegionItem {
    id: string;
    label: string;
  }

  export interface User {
    isLogin: boolean;
    name: string;
    mail: string;
    description: string;
    from: {
      province: RegionItem;
      city: RegionItem;
      county: RegionItem;
    };
    headPic: string;
    blogUrl: string;
    tags: { id: number; value: string; empty: boolean }[];
    token?: any;
  }

  export interface PostUserMsg {
    mail: string;
    description: string;
    from: {
      province: RegionItem;
      city: RegionItem;
      county: RegionItem;
    };
    headPic: string;
    blogUrl: string;
    tags: { value: string; empty: boolean }[];
  }

  export interface ProblemItem {
    id: number;
    title: string;
    acceptance: string;
    level: problemLevel.easy;
    total: number;
    pass: boolean;
  }

  interface HeadLinesItem {
    id: number;
    title: string;
    url: string;
  }

  export interface HeadLines {
    content: Array<HeadLinesItem>,
    status: string,
  }

  export interface ContentList<T> {
    content: T;
    currentPage: number;
    onePageContent: number;
    max: number;
    searchVal: string;
  }

  export interface ProblemDemo {
    id: number;
    in: string;
    out: string;
  }

  export interface ProblemInfo {
    id: number;
    title: string;
    difficuly: number;
    isPass: boolean;
    introduce: string;
    out: string;
    in: string;
    demo: ProblemDemo[];
    limitTime: string;
    limitMemory: string;
    from: string;
    information: string;
  }


  export interface AnswerTypeItem {
    type: string,
    code: string
  }

  export interface ContestItem {
    id: number;
    contestName: string;
    contestInfo: string;
    contestUrl: string;
    contestDate: number;
    contestState: string;
    type: string;
  }

  export interface ContestingState {
    isContesting: boolean;
    contestingURL: string;
  }

  interface ProblemMsg {
    id: number;
    success: number;
    fail: number;
    timeout: number;
    memoryout: number;
    other: number;
  }

  export interface StatusItem {
    id: number;
    when: number;
    infoState: string;
    time: string;
    memory: string;
    language: string;
    anuther: string;
    problemMsg: ProblemMsg;
  }

  export interface ContestCheckInfo {
    id: string,
    title: string,
    info: string,
    begin: string,
    end: string,
  }
}
