import axios from "axios";
import React from "react";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      results: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let url = "https://en.wikipedia.org/w/api.php?origin=*";
    try {
      const response = await axios.get(url, {
        params: {
          action: "query",
          list: "search",
          srsearch: this.state.value,
          format: "json",
        },
      });

      const data = response.data.query.search;
      this.setState({ results: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter Your Search word:</label>
          <input value={this.state.value} onChange={this.handleChange} />
        </form>
        <div className="result">
          <ul>
            {this.state.results.map((item) => (
              <a href={`https://en.wikipedia.org/?curid=${item.pageid}`} target="_blank">
                <li key={item.pageid}>{item.title}</li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Results;
