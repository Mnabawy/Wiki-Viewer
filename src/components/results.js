import axios from "axios";
import React from "react";
import "./results.css";
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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Start Your Wiki Search Here</h2>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="search"
            pattern=".*\S.*"
            required
            value={this.state.value}
            onChange={this.handleChange}
          />
          <span className="caret"></span>
        </form>
        <div className="result">
          {this.state.results.map((item) => (
            <div key={item.pageid} className="card">
              <a
                href={`https://en.wikipedia.org/?curid=${item.pageid}`}
                target="_blank"
              >
                <ul>
                  <li>
                    <h1>{item.title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: item.snippet }}></p>
                  </li>
                </ul>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
