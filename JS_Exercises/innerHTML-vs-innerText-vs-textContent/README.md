innerHTML vs innerText vs textContent – What's the Difference?

In HTML, innerHTML, innerText, and textContent are properties of the DOM (Document Object Model). They allow you to read and update the content of HTML elements.
But they have different behaviours in terms of the content they include and how they handle HTML markup.

The innerHTML property recognizes HTML tags and renders the content according to the tags. innerText and textContent ignore HTML tags and treat them as part of the text.

innerText reads content as it appears on screen, ignores hidden content, and observes formatting of text. But textContent reads content as it appears in the markup. This means it reads hidden content too. But it also ignores formatting like whitespaces and line breaks when you are using it set content.

Source: https://www.freecodecamp.org/news/innerhtml-vs-innertext-vs-textcontent/
