export default function Column({ column }) {
  return (

    <th
      style={{
        ...thStyle,
        ...(column.width ? { width: column.width } : {}),
      }}
    >
      {column.label}
    </th>
  )
}
const thStyle = {
  textAlign: "left",
  padding: "10px",
  fontSize: "13px",
  fontWeight: "600",
  whiteSpace: "nowrap",
};