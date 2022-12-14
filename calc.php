<?php

  header("Content-Type: application/json");

  $json = file_get_contents("php://input");
  $data = json_decode($json, true);

  /* Присваивание переменным значений из JSON */
  $startDate = $data['date'];
  $term = $data['term'];
  $sum = $data['sum'];
  $percent = $data['percent'];
  $sumAdd = $data['sumAdd'];

  for ($i = 0; $i < $term ; $i++) {
    $daysY = 365;
    $countMonth = $startDate[4] + $i;

    /* Проверка дней в каждом месяце */
    switch ($countMonth) {
      case 1:
        $daysN = 31;
        break;
      case 3:
        $daysN = 31;
        break;
      case 5:
        $daysN = 31;
        break;
      case 7:
        $daysN = 31;
        break;
      case 8:
        $daysN = 31;
        break;
      case 10:
        $daysN = 31;
        break;
      case 12:
        $daysN = 31;
        break;
      case 2:
        $daysN = 28;
        break;
      default:
        $daysN = 30;
        break;
    }
    /* Условие для проверки средств за прошлый месяц */
    switch ($i) {
      case 0:
      /* В первом месяце отсутствует эжемесячный платёж, поэтому на счёте только сумма вклада*/
        $finishSum = $sum;
        $sumAdd = 0;
        break;
      default:
      /* Если в пользователь не назначаил sumAdd, то будет передаваться 0*/
        if ($data['sumAdd'] == null) {
          $sumAdd = 0;
        }
        else {
          $sumAdd = $data['sumAdd'];
        }
    }

    /* Формула расчёта дохода */
    $result = $finishSum + ($finishSum + $sumAdd) * $daysN * ($percent / $daysY);
    $finishSum = $result;
  }

  $answer = round($result, 0);
  $answer = number_format($answer, 0, '.', ' ');

  echo '₽ '.$answer;
?>
