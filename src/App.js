import './App.css';
import React, { useState } from 'react';
import Webcam from 'react-webcam';


function App() {
  const [nama, setNama] = useState("");
  // const [time, setTime] = useState(new Date().toLocaleString("id-ID"));

  //webcam
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const getTanggal = new Date();

  let tahun = getTanggal.getFullYear(),
    tanggal = getTanggal.getDate(),
    jam = getTanggal.getHours(),
    menit = getTanggal.getMinutes(),
    detik = getTanggal.getSeconds();

  let bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    namaBulan = bulan[getTanggal.getMonth()];

  let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
    namaHari = hari[getTanggal.getDay()];

  let result = namaHari + ", " + tanggal.toString().padStart(2, '0') + " " + namaBulan + " " + tahun + " " + jam.toString().padStart(2, '0') + ":" + menit.toString().padStart(2, '0') + ":" + detik.toString().padStart(2, '0');
  let resultTanggal = tanggal.toString().padStart(2, '0') + " " + namaBulan + " " + tahun;
  let resultJam = jam.toString().padStart(2, '0') + ":" + menit.toString().padStart(2, '0') + ":" + detik.toString().padStart(2, '0');
  let cekJam = jam.toString().padStart(2, '0')
  console.log("tanggal", resultTanggal);
  console.log("cek jam", cekJam);

  const capture = React.useCallback(() => {
    if (nama === "") {
      alert("Silakan Masukkan Nama!")
    } else {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc, nama]);
  console.log(imgSrc);


  const onChangeNama = (e) => {
    setNama(e.target.value);
  }
  console.log(nama);

  // useEffect(() => {
  //   const time = () => {
  //     const event = new Date();
  //     setTime(event.toLocaleString("id-ID"));
  //   };
  //   const intervalId = setInterval(time, 1000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };

  // }, [])

  return (
    <div className='container' style={{ paddingTop: "50px", height: "100vh" }}>
      <div className='row'>
        <div className='col'>
          <h2 style={{ textAlign: "center" }}>Absensi Universitas Pasundan</h2>
          <p style={{ textAlign: "center", marginTop: "30px" }}>{result.substring(0, result.length - 8)}</p>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            <iframe title="jam" style={{ textAlign: "center" }} src="https://free.timeanddate.com/clock/i8ohmg0d/n437/tlid38/fs20/tct/pct/ftb/th1/ta1" width="127" height="25" allowtransparency="true"></iframe>
          </p>
        </div>
      </div>

      <div className='row' style={{ display: "flex", justifyContent: "center" }}>
        <div className='col-md-2' style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <Webcam
            imageSmoothing={true}
            screenshotQuality={1}
            mirrored={true}
            height={150}
            width={150}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </div>
        <div className='col-md-3' style={{ marginBottom: "20px", alignItems: "center", alignSelf: "center" }}>
          <div className="form-floating">
            <input type="text" className="form-control" value={nama} id="nama" name="nama" placeholder="Masukkan Nama"
              onChange={onChangeNama}
            />
            <label htmlFor="floatingPassword">Masukkan Nama</label>
          </div>
        </div>
        <div className='col-md-3' style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <button type="button" className="btn btn-success" style={{ height: "58px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={capture}>Absen</button>
        </div>
      </div>

      {/* tabel detail */}
      <div className='row' style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
        <div className='col-md-4' style={{ marginBottom: "20px" }}>
          <table className="table table-striped table-hover">
            <tbody>
              <tr>
                <td>Jam Absen</td>
                <td>Foto</td>
                <td>Nama</td>
                <td>Absen</td>
                {/* <td>Tanggal</td> */}
              </tr>
              <tr>
                <td>08:00</td>
                <td>{cekJam <= 11 ? (<img src={imgSrc} alt="" />) : ""}</td>
                <td>{nama && cekJam <= 11 ? (<p>{nama}</p>) : ""}</td>
                <td>{nama && cekJam <= 11 ? resultJam : ""}</td>
                {/* <td>{nama && cekJam <= 11 ? resultTanggal : ""}</td> */}
              </tr>
              <tr>
                <td>11:00</td>
                <td>{cekJam <= 13 && cekJam >=11 ? (<img src={imgSrc} alt="" />) : ""}</td>
                <td>{nama && cekJam <= 13 ? (<p>{nama}</p>) : ""}</td>
                <td>{nama && cekJam <= 13 ? resultJam : ""}</td>
                {/* <td>{nama && cekJam <= 13 ? resultTanggal : ""}</td> */}
              </tr>
              <tr>
                <td>13:00</td>
                <td>{cekJam <= 16 && cekJam >=13 ? (<img src={imgSrc} alt="" />) : ""}</td>
                <td>{nama && cekJam <= 16 ? (<p>{nama}</p>) : ""}</td>
                <td>{nama && cekJam <= 16 ? resultJam : ""}</td>
                {/* <td>{nama && cekJam <= 16 ? resultTanggal : ""}</td> */}
              </tr>
              <tr>
                <td>16:00</td>
                <td>{cekJam <= 23 && cekJam >=16 ? (<img src={imgSrc} alt="" />) : ""}</td>
                <td>{nama && cekJam <= 23 ? (<p>{nama}</p>) : ""}</td>
                <td>{nama && cekJam <= 23 ? resultJam : ""}</td>
                {/* <td>{nama && cekJam <= 23 ? resultTanggal : ""}</td> */}
              </tr>
            </tbody>
          </table>

        </div>
      </div>


    </div>
  );
}

export default App;
