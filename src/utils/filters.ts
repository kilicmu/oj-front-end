import Vue from "vue";

Vue.filter("handleTime", function(value: string) {
  if (value.length < 2) {
    return "0" + value;
  } else {
    return value;
  }
});
