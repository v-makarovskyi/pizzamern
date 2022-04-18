import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import { listUsers, deleteUser } from "../../redux/actions/userActions";

import "./userlistadminpage.scss";

const UserListAdminPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [userInfo, dispatch, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Вы уверены?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <div className="userlistadminpage">
        <div className="container">
          <p className="title">Пользователи</p>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <table>
              <colgroup>
                <col style={{ background: "yellow" }} span={5} />
              </colgroup>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Админ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto: ${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.isAdmin ? <i class="bi bi-check-lg" style={{fontSize:'20px', color:'green', fontWeight:'900'}}></i> : <i class="bi bi-x-lg" style={{fontSize:'20px', color:'red', fontWeight:'900'}}></i>}</td> 
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="editUser">
                         <i class="bi bi-pen-fill" style={{fontSize:'20px', color:'green', fontWeight:'900'}}></i>
                        </button>
                      </Link>

                      <button className="deleteUser" onClick={deleteHandler}>
                        <i class="bi bi-x-lg" style={{fontSize:'20px', color:'red', fontWeight:'900'}}></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserListAdminPage;
