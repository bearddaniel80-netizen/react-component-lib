export default function HtmlFragment({ data }) {
  return (
    <div class="comntainer">
    <div
      className="html-fragment"
      dangerouslySetInnerHTML={{
        __html: data,
      }}
    />
    </div>
  );
}