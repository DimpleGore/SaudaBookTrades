import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";

function API() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get("https://api.sampleapis.com/futurama/characters").then((resp) => {
      console.log(resp.data);
      setCharacters(resp.data);
    });
  }, []);

  var str =
    "https://static.wikia.nocookie.net/enfuturama/images/9/94/AmyWong.png/revision/latest/scale-to-width-down/160?cb=20170123190854";
  console.log(str.substring(0, 68));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return (
          <div>
            {name &&
              Object.keys(name).map((item, i) => (
                <space key={i}>{name[item]}</space>
              ))}
          </div>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => {
        return (
          <div>
            {images &&
              Object.keys(images).map((item, i) => {
                if (item === "main") {
                  var str = images[item];
                  var newtext = str.indexOf("/revision");
                  console.log(newtext);
                  if (newtext != "-1") {
                    str = str.slice(0, newtext);
                  }

                  return (
                    <img style={{ width: "50px" }} src={str} alt="image" />
                  );
                }
              })}
          </div>
        );
      },
    },
    
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Home Planet",
      dataIndex: "homePlanet",
      key: "homePlanet",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Species",
      dataIndex: "species",
      key: "species",
    },
    {
      title: "Sayings",
      dataIndex: "sayings",
      key: "sayings",
      maxLength: "0",
      render: (sayings) => {
        return <div>{sayings && <p>{sayings[0]}</p>}</div>;
      },
    },
   ];

  return (
    <div>
      {characters && (
        <Table
          dataSource={characters}
          columns={columns}
          scroll={{ x: 240, y: 700 }}
        />
      )}
    </div>
  );
}

export default API;
