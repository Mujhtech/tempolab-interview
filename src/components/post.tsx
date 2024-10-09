import { Post } from "../type";

export default function PostView({ data }: { data: Post }) {
  return (
    <a className="" href={data.url} target="_blank">
      <p className="">{data.title}</p>
      <p className="">
        <span>Created By: {data.by}</span>
        <span>At: {new Date(data.time).toLocaleString()}</span>
      </p>
    </a>
  );
}
