export interface Homes {
  title: string;
  description: BodyItem[];
  heading_text: string;
  heading_image: Value;
  id: string;
  content: [];
}

export interface Content {
  title: string;
  description: BodyItem[];
  id: string;
}

export interface Child {
  text: string;
  type?: string;
  children: Child[];
  linkType?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface Value {
  id: string;
  alt: string;
  filename: string;
  caption: Child[];
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface BodyItem {
  children: Child[];
  type?: string;
  value?: Value;
  relationTo?: string;
  url?: string;
}

export interface responseJob {
  docs: DataJob[];
}

export interface responseCarrousel {
  docs: DataCarrousel[];
  createdAt:string
}
export interface DataCarrousel{
  id:string;
  image:Value
}

export interface responseArticles {
  docs: DataArticles[];
  totalDocs: number;
  totalPages:number;
  page:number;
  limit:number
}

export interface DataArticles {
  id: string;
  title: string;
  description: BodyItem[];
  meta:meta,
  slug:string;
  headingImg:Value;
  createdAt:string;
  updatedAt:string
}

export interface meta{
  title:string;
  description:string
}
export interface DataJob {
  id: string;
  company: string;
  title: string;
  dateStart: string;
  dateEnd?: string | null;
  companyLogo: Value;
}

export interface responseProject{
  docs:DataProject[]
}
export interface DataProject{
  id:string;
  name:string;
  desc:string;
  link:string;
  HeadingImg:Value
  createdAt:string
  updatedAt:string
}
