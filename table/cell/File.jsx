export default function FileCell({ row }) {
  return (
    <span title={row.path}>
      {row.name}
    </span>
  );
}