const onSubmit = async (data) => {
  console.log("alla data", data);
  let resp = await axios
    .post("http://resume.vitelglobal.com:8000/post_annoucement_data/", {
      data,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
  //setFormData(data);
  setSuccessAlert(true);
  setShow(false);
  reset();
  setSelected([]);
};
