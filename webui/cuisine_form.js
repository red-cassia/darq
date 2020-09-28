
function submitForm() {
  var data;

  try {
    data = Form.getFormData('cuisine-form');
  }
  catch (e) {
    console.log(e);
    return;
  }

  $("#loading-blanket").show();

  GraphQL.mutation(`
    mutation ($data: NewFoodBusinessInput!) {
      addFoodBusiness(data: $data)
    }
  `, {
    "data": data
  }).then(res => {
    $("#loading-blanket").hide();

    if (! res.hasError) {
      alert("Your business has been added. The data will be reviewed and we will contact you shortly.");
      queryOwnedBusinesses();
    }
    else {
      alert(res.errors[0]["message"]);
    }
  });
}

$(document).ready(function () {

  loadingScreen(async () => {
    await GraphQL.fillOptionsFromEnum("FoodBusinessSubType", [
      "cuisine-sub-type"
    ]);

    await GraphQL.fillOptionsFromEnum("City", [
      "cuisine-city"
    ]);
  });
});
