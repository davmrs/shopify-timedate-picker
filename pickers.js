// Datepicker configuration in Spanish
$(function ($) {
  $.datepicker.regional["es"] = {
    closeText: "Cerrar",
    prevText: "&#x3c;Ant",
    nextText: "Sig&#x3e;",
    currentText: "Hoy",
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Mi&eacute;rcoles",
      "Jueves",
      "Viernes",
      "S&aacute;bado"
    ],
    dayNamesShort: [
      "Dom",
      "Lun",
      "Mar",
      "Mi&eacute;",
      "Juv",
      "Vie",
      "S&aacute;b"
    ],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "S&aacute;"],
    weekHeader: "Sm",
    dateFormat: "yy/mm/dd",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ""
  };
  $.datepicker.setDefaults($.datepicker.regional["es"]);
});

$(document).ready(function () {
  $(function () {
    // Getting current Date and Time
    var currentDate = new Date();
    // var currentHour = currentDate.getHours();

    // Comment next line on Prod Env (Just for testing!!!) 
    // Hour in 24 format (0-23)
    var currentHour = 18;

    var minDate = -0; // It enables today as a possible option to be selected

    // After 13h it is not possible to choose today
    if (currentHour >= 13) {
      minDate = 1;
    }

    $("#date").datepicker({
      minDate: minDate,
      maxDate: "+2M",
      onSelect: function (dateText) {
        var today = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ).getTime();
        var selected = new Date(dateText).getTime();
        var daySelected = new Date(dateText).getDay();
        console.log('Selected day ' + daySelected);
        console.log('Selected ' + selected);
        console.log('Today ' + today);

        if (today > selected) {
          alert("fecha no válida");
        } else if (today < selected) {
          // For a different day than today
          void 0;
          let minTime = "08:00 am";
          let maxTime = "7:00pm";
          console.log(daySelected);

          // Getting the difference in days
          const diffTime = Math.abs(today - selected);
          // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // Comment next line on Prod Env (Just for testing!!!) 
          const diffDays = 1;
          console.log(diffDays + " days");

          // After 18h the minTime available is 10h
          if (currentHour >= 18 && diffDays == 1) {
            minTime = "10:00 am";
          }

          // On purchases from Saturday to Sunday the minTime available is 15h
          if (daySelected == 0 && diffDays == 1) {
            minTime = "3:00pm";
          }

          // Setting Saturday and Sunday out of service hour: 5:00pm
          if (daySelected == 0 || daySelected == 6) {
            maxTime = "5:00pm";
          }

          let defaultTime = minTime.substring(0, 2);

          $(function () {
            console.log("fecha diferente de hoy");
            console.log(maxTime);
            $("#time").timepicker({
              timeFormat: "h:mm p",
              interval: 30,
              minTime: minTime,
              maxTime: maxTime,
              //defaultTime: defaultTime,
              //startTime: minTime,
              dynamic: false,
              dropdown: true,
              scrollbar: true
            });
          });

          $("#time").data("TimePicker").options.minTime = minTime;
          $("#time").data("TimePicker").options.maxTime = maxTime;
          $("#time").data("TimePicker").options.defaultTime = defaultTime;
          $("#time").data("TimePicker").options.startTime = minTime;
          $("#time").timepicker("setTime", minTime);
          /*  since v1.1.2 does not support changing most of the options, we need
              to trick the plugin into thinking the next time the dropdown needs
              to be displayed is the first time, so it re-generates the items, 
              using the new format */
          $("#time").data("TimePicker").items = null;
          $("#time").data("TimePicker").widget.instance = null;
        } else {
          // When the selected day is today
          alert(
            "Se seleccionó entrega el día de hoy.\nPor temas logísticos, en entregas el mismo día tenemos las siguientes condiciones:\nEn compras de 0:00 hrs. a 10:00 hrs. - Horario de entrega de 15:00 hrs. a 19:00 hrs.\nEn compras de 10:01 hrs. a 13:00 hrs. - Horario de entrega de 17:00 hrs. a 19:00 hrs.\nEn compras después de las 13:00 hrs. no es posible la entrega el mismo día.\n\nEn caso de seleccionar un horario inválido se contactará al cliente para elegir una hora válida para la entrega"
          );
          let minTime = "";
          let maxTime = "7:00pm";

          if (currentHour >= 0 && currentHour < 10) {
            minTime = "03:00 pm";
          } else {
            minTime = "05:00 pm";
          }

          // Setting Saturday and Sunday out of service hour: 5:00pm
          if (daySelected == 0 || daySelected == 6) {
            maxTime = "5:00pm";
          }

          let defaultTime = minTime.substring(0, 2);
          console.log(minTime, defaultTime);

          $(function () {
            console.log("fecha hoy");
            $("#time").timepicker({
              timeFormat: "h:mm p",
              interval: 30,
              minTime: minTime,
              maxTime: maxTime,
              //defaultTime: defaultTime,
              //startTime: minTime,
              dynamic: false,
              dropdown: true,
              scrollbar: true
            });
          });

          $("#time").data("TimePicker").options.minTime = minTime;
          $("#time").data("TimePicker").options.maxTime = maxTime;
          $("#time").data("TimePicker").options.defaultTime = defaultTime;
          $("#time").data("TimePicker").options.startTime = minTime;
          $("#time").timepicker("setTime", minTime);
          /*  since v1.1.2 does not support changing most of the options, we need
              to trick the plugin into thinking the next time the dropdown needs
              to be displayed is the first time, so it re-generates the items, 
              using the new format */
          $("#time").data("TimePicker").items = null;
          $("#time").data("TimePicker").widget.instance = null;
        }
      }
    });
  });
});  