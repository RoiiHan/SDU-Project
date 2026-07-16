import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./style/UserTerbaru.css";

function UserTerbaru({ userTerbaru }) {
  return (
    <div className="user-terbaru">
      <div className="section-title">
        <FontAwesomeIcon icon={faUserPlus} />
        <h2>User Terbaru</h2>
      </div>

      {userTerbaru.length === 0 ? (
        <p className="empty-text">Belum ada user baru.</p>
      ) : (
        userTerbaru.map((u) => (
          <div className="user-item" key={u.id}>
            <div>
              <h4>{u.nama}</h4>
              <p>{u.no_hp}</p>
            </div>
            <span>{new Date(u.created_at).toLocaleDateString("id-ID")}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default UserTerbaru;
