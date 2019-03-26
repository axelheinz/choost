import React, { Component } from "react";
import "../App.css";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      selectedOption: "",
      icons: [
        "fas fa-dog",
        "fas fa-male",
        "fas fa-female",
        "fas fa-globe",
        "fas fa-tv",
        "fas fa-play",
        "fas fa-laptop",
        "fas fa-hand-scissors",
        "fas fa-music",
        "fas fa-drum",
        "fas fa-motorcycle",
        "fas fa-horse",
        "fas fa-chess",
        "fas fa-dice",
        "fas fa-ghost",
        "fas fa-baby",
        "fas fa-feather-alt",
        "fas fa-hippo",
        "fas fa-robot",
        "fas fa-cookie",
        "fas fa-ice-cream"
      ]
    };
  }
  addCategory = event => {
    console.log("this is addcategory");
    event.preventDefault();
    let q = this.nameInput.value;
    let categoryName = this.searchInput.value;
    let categoryIcon = this.state.selectedOption;
    this.props.addCategory(q, categoryName, categoryIcon);
    this.closeWindow();
  };

  closeWindow = event => {
    this.setState({
      show: this.state.show ? false : true
    });
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    return (
      <div
        className={
          this.state.show ? "modal is-clipped is-active" : "modal is-clipped"
        }
      >
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add Your Own Category</p>
          </header>
          <section className="modal-card-body">
              
                {/* Category Name */}
                <div className="field">
                <label className="label is-medium">Category Name</label>
                <div className="control">
                <input
                  ref={input => (this.nameInput = input)}
                  className="input is-medium is-warning"
                  type="text"
                  placeholder="Enter a Category Name"
                /></div>
                </div>
                {/* Search */}
                <div className="field">
                <label className="label is-medium">Search</label>
                <div className="control">

                <input
                  ref={input => (this.searchInput = input)}
                  className="input is-medium is-warning"
                  type="text"
                  placeholder="Enter as many keywords as you like"
                />
                </div>
                </div>
                {/* Icon */}
                <div className="field">
                <label className="label is-medium">Choose an Icon</label>

                <div class="control" onChange={this.handleOptionChange}>
                    {this.state.icons.map(icon => (
                     
                     <label className="select-icon radio" for={icon}>
                        <input
                          name="select-icon"
                          type="radio"
                          id={icon}
                          value={icon}
                        />
                        <i className={icon} />
                      </label>
                    ))}
                  {/* </label> */}
                </div>
                </div>
              
            {/* </div> */}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.addCategory}>
              Save changes
            </button>
            <button className="button" onClick={this.closeWindow}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default AddCategory;