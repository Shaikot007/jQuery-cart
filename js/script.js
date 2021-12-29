var products = [
  { id: 1, name: "Shirt", price: "2000" },
  { id: 2, name: "Sharee", price: "4000" },
  { id: 3, name: "T-shirt", price: "1200" },
  { id: 4, name: "Football", price: "1500" },
  { id: 5, name: "Pant", price: "3000" }
];

var select = "";

select += "<select basis='1' onchange='setPriceQuantityAndTotalPrice(this.value, this)'>";
select += "<option disabled selected> -- Select product -- </option>";
$.each(products, function (key, value) {
  select += '<option value="' + value.id + '">' + value.name + "</option>";
});
select += "</select>";

$("#td1").append(select);

var index = 2;

$("#addButton").click(function () {
  var tr = "";

  tr += "<tr>";

  tr += "<td>";
  tr += '<select basis="' + index + '" onchange="setPriceQuantityAndTotalPrice(this.value, this)">';
  tr += "<option disabled selected> -- Select product -- </option>";
  $.each(products, function (key, value) {
    tr += '<option value="' + value.id + '"> ' + value.name + '</option>';
  });
  tr += "</select>";
  tr += "</td>";

  tr += '<td><input type="number" basis="' + index + '" id="price' + index + '" onkeyup="updateTotalPriceByPrice(this)" /></td>';
  tr += '<td><input type="number" basis="' + index + '" id="quantity' + index + '" onkeyup="updateTotalPriceByQuantity(this)" /></td>';
  tr += '<td><input type="text" id="total' + index + '" readonly class="item-total-price" /></td>';
  tr += "<td><button type='button' class='remove-button'>-</button></td>";

  tr += "</tr>";

  $("#res").append(tr);

  index++;
});

$(document).on("click", ".remove-button", function () {
  $(this).closest("tr").remove();
  setGrandTotal();
});

//value = product id
//select = updated product id (example: basis="1")
function setPriceQuantityAndTotalPrice(value, select) {
  var product = products.find(product => { return product.id == value });

  var index = $(select).attr("basis");
  // console.log(index);

  $("#price" + index).val(product.price);
  $("#quantity" + index).val(1);
  $("#total" + index).val(product.price * 1);
  setGrandTotal();
}

function updateTotalPriceByQuantity(input) {
  var index = $(input).attr("basis");
  var quantity = $(input).val();
  var price = $("#price" + index).val();
  var total = price * quantity;
  $("#total" + index).val(total);
  setGrandTotal();
}

function updateTotalPriceByPrice(input) {
  var index = $(input).attr("basis");
  var price = $(input).val();
  var quantity = $("#quantity" + index).val();
  var total = price * quantity;
  $("#total" + index).val(total);
  setGrandTotal();
}

function setGrandTotal() {
  var sum = 0;
  $(".item-total-price").each(function () {
    sum = sum + Number($(this).val());
  });
  $("#grandTotal").text(sum);
}
