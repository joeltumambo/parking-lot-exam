const DataDisplay: React.FC<{
  data: any;
}> = ({ data }) => (
  <code
    style={{
      whiteSpace: "pre",
    }}
  >
    {JSON.stringify(data, null, 2)}
  </code>
);

export default DataDisplay;
