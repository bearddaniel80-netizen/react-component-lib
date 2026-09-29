export default function ShortNameCell({ row }) {
  return (
    <span title={row.name}>
      {row.shortName}
    </span>
  );
}