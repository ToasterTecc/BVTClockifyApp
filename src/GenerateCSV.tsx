import React, { useState } from "react";
import { downloadCSV, getFileSize } from "../api/api";

type OptionObject = {
  project: string;
};

type GenerateCSVProps = {
  options: OptionObject[];
};

export default function GenerateCSV(props: GenerateCSVProps) {
  const [csvOptions, setCSVOptions] = useState<string[]>([]);
  const { options } = props;
  const [loading, setLoading] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCSVOptions((prevOptions) => {
        return [...prevOptions, value];
      });
    } else {
      setCSVOptions((prevOptions) => {
        return prevOptions.filter((option) => option !== value);
      });
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (csvOptions.length) {
      let res = await downloadCSV(csvOptions);
      let fileSize = await getFileSize();

      while (res?.data.size !== fileSize?.size) {
        res = await downloadCSV(csvOptions);
        fileSize = await getFileSize();
      }

      if (res) {
        const blob = new Blob([res.data], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `master.csv`;

        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        setLoading(false);
      } else {
        onSubmit(event);
      }
    } else {
      console.log("No cohort selected");
    }

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="checkboxes">
        <label>
              <input
                type="checkbox"
                value="meme"
              ></input>
                meme</label>
                <label>
              <input
                type="checkbox"
                value="meme"
                id="checkbox2"
              ></input>
              meme2</label>
      </div>
      <button type="submit" className="csv-download">Download Clockify CSV</button>
    </form>
  );
}