import React, { Component } from "react";
import BoardService from "../../api/BoardService";

class ListBoardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [], //board 변수를 선언
    };

    //버튼을 클릭하면 동작하는 createUser 바인드
    this.createUser = this.createUser.bind(this);
  }

  //생명주기
  componentDidMount() {
    BoardService.getBoards().then((res) => {
      //BoardService의메소드로 데이터를 가져옴
      this.setState({ boards: res.data });
    });
  }

  //회원가입페이지로 이동하게 해주는 함수를 정의함
  createUser() {
    this.props.history.push("/sign/register/");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Boards List</h2>

        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>EMAIL </th>
                <th>PHONENUMBER</th>
                <th>ADDRESS</th>
              </tr>
            </thead>
            <tbody>
              {this.state.boards.map((board) => (
                <tr key={board.id}>
                  <td> {board.username} </td>
                  <td> {board.email} </td>
                  <td> {board.phonenumber} </td>
                  <td> {board.address} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListBoardComponent;
