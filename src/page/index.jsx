import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./simple.css"; 

export const MainPage = () => {
  const [htmlInput, setHtmlInput] = useState("<p>Пример текста :)</p>");
  const renderedRef = useRef(null);
  const [error, setError] = useState("");

  const validateHTML = (html) => {
    const tagPattern = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
    const stack = [];
    let match;

    while ((match = tagPattern.exec(html)) !== null) {
      const [, tagName] = match;
      if (!match[0].startsWith("</")) {
        
        stack.push(tagName);
      } else {
        
        if (stack.length === 0 || stack[stack.length - 1] !== tagName) {
          setError(`Несоответствующий закрывающий тег: </${tagName}>`);
          return false;
        }
        stack.pop();
      }
    }

    if (stack.length > 0) {
      setError(`Незакрытый тег: <${stack[stack.length - 1]}>`);
      return false;
    }

    setError(""); 
    return true;
  };

  useEffect(() => {
    const $renderedElement = $(renderedRef.current);
    $renderedElement.on("input", function () {
      setHtmlInput(this.innerHTML); 
    });

    return () => {
      $renderedElement.off("input");
    };
  }, []);

  useEffect(() => {
    const $renderedElement = $(renderedRef.current);

    if (!$renderedElement.is(":focus")) {
      $renderedElement.html(htmlInput); 
    }
  }, [htmlInput]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setHtmlInput(value);
    validateHTML(value);
  };
  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">HTML Редактор</h1>
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-secondary">HTML ввод</h3>
          <textarea
            className="form-control custom-textarea"
            rows="10"
            value={htmlInput}
            onChange={handleInputChange}
          ></textarea>
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
        <div className="col-md-6">
          <h3 className="text-secondary">Отрендеренный вывод</h3>
          <div
            ref={renderedRef}
            className="p-3 custom-output"
            contentEditable
            tabIndex={0}
          ></div>
        </div>
      </div>
    </div>
  );
};