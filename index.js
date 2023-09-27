// Tạo mảng chứa giá trị dạng table
const VALUES = [
  { id: "scissors", value: "✌️" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "🖐" },
];

// Phân tích: khi nào thì thắng
// 0 - 2 = -2
// 1 - 0 = 1
// 2 - 1 = 1
//indexPlayer - indexComputer = 1 || -2 => thắng
//indexPlayer - indexComputer = 0 => hòa
// Thua: else

//function đổi giá trị cho máy tính
let i = 0;
const handleChange = () => {
  let computer = document.querySelector("#computer");
  computer.textContent = VALUES[i].value;
  computer.dataset.id = VALUES[i].id; //thêm data-id cho computer
  i = i === VALUES.length - 1 ? 0 : ++i;
};

//Lưu interval để dành cho trường hợp cần dừng lại
let interval = setInterval(handleChange, 100);

//Viết hàm so sánh giá trị của user và computer
const compare = (valuePlayer, valueComputer) => {
  let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);
  let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);
  let result = indexPlayer - indexComputer;
  if (result == -2 || result == 1) {
    return 1;
  } else if (result == 0) {
    return 0;
  } else {
    return -1;
  }
};
const scorePlayer = document.createElement("h4");
const scoreComputer = document.createElement("h4");
let sPlayer = 0;
let sComputer = 0;
scorePlayer.textContent = 0;
scoreComputer.textContent = 0;
document.querySelector(".scorePlayer").appendChild(scorePlayer);
document.querySelector(".scoreComputer").appendChild(scoreComputer);
//Sự kiện click của người chơi
const playerItems = document.querySelectorAll(".user");
//Cho các nút lắng nghe sự kiện
playerItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    clearInterval(interval); // dừng máy lại
    let valuePlayer = event.target.id;
    let valueComputer = computer.dataset.id; //dataset.id để lấy data-id | .getAttribute("data-id")
    let result = compare(valuePlayer, valueComputer);

    //duyệt từng nút user và xóa hết actived
    playerItems.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none"; //xóa hiệu ứng nhấn chuột
    });
    //add actived
    event.target.classList.add("actived");

    //Tạo thông báo
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert"); //alert là 1 class của bootstrap
    let msg = "";
    if (result == 1) {
      msg = "Bạn thắng";
      alertDiv.classList.add("alert-success");
    } else if (result == 0) {
      msg = "Bạn hòa";
      alertDiv.classList.add("alert-warning");
    } else {
      msg = "Bạn thua";
      alertDiv.classList.add("alert-dark");
    }

    alertDiv.textContent = msg; //alertDiv là một div nên muốn tạo content thì .textContent
    document.querySelector(".notification").appendChild(alertDiv); // đưa code từ js vào html
    document.querySelector("#play-again").classList.remove("d-none");

    //Tính điểm
    if (result == 1) {
      sPlayer += 1;
      scorePlayer.textContent = sPlayer;
      document.querySelector(".scorePlayer").appendChild(scorePlayer);
    } else if (result == -1) {
      sComputer += 1;
      scoreComputer.textContent = sComputer;
      document.querySelector(".scoreComputer").appendChild(scoreComputer);
    }
  });
});

//Chơi lại
document.querySelector(".btn-play-again").addEventListener("click", (event) => {
  clearInterval(interval);
  interval = setInterval(handleChange, 100);
  playerItems.forEach((item) => {
    item.classList.remove("actived");
    item.style.pointerEvents = "";
  });

  //Xóa nội dung notification
  document.querySelector(".notification").innerHTML = "";
  document.querySelector("#play-again").classList.add("d-none");
});

//Khi ấn vào nút Kết thúc

document.querySelector(".btn-exit").addEventListener("click", (event) => {
  let choice = confirm("Do you want to finish?");
  const exitInfo = document.createElement("h2");
  if (choice == true) {
    document.querySelector(".scoreInfo").classList.add("d-none");
    clearInterval(interval);
  }
  if (sPlayer > sComputer) {
    document.querySelector(".score-win").style =
      "display: block; background-color: aquamarine; padding: 10px; margin-top: 15px";
  } else if (sPlayer == sComputer) {
    document.querySelector(".score-draw").style =
      "background-color: antiquewhite; padding: 10px;; display: block; margin-top: 15px";
  } else {
    document.querySelector(".score-lost").style =
      "background-color: gainsboro; padding: 10px; display: block; margin-top: 15px";
  }
});
