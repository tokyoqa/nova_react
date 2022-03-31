import React from "react";


const Data = ()  => {
  return(
    <>
      <div className="doc-form">
        <h1>Заполните пожалуйста поля:</h1>
        <form>
          <label for="doc-name">Имя:</label>
          <input type="text" id="doc-name" name="doc-name" value="" autofocus="autofocus"/>

          <label for="doc-surname">Фамилие::</label>
          <input type="text" id="doc-surname" name="doc-surname" value=""/>

          <label for="doc-patronymic">Отчество:</label>
          <input type="text" id="doc-patronymic" name="doc-patronymic" value=""/>

          <label for="doc-inn">ИНН:</label>
          <input type="number" id="doc-inn" name="doc-inn" value="" />

          <label for="doc-inn">ИНН:</label>
          <input type="number" id="doc-inn" name="doc-inn" value="" />

          <input type="checkbox" class="custom-checkbox" id="happy" name="happy" value="yes"/>
          <label for="male"></label>
        </form>
      </div>
    </>
  )
}

export default Data;