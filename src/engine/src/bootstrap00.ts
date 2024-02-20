import {Container, ContainerFluid, Header, Paragraph} from "@ui-md-bootstrap-kit/index";

function bootstrap00() {
  const wrapperContainer = new Container();

  // orange header 'h1'

  let header = new Header("h1", "h1: Hello Orange World!");
  wrapperContainer.add(header);
  header.setColor("orange");

  // green header 'h2'

  header = new Header("h2", "h2: Hello Green World!");
  wrapperContainer.add(header);
  header.setStyleRule("color", "green");

  // tan header 'h3'

  wrapperContainer.add(new Header("h3", "h3: Hello Tan World!", {
    style: {
      color: "tan"
    }
  }));

  // navy header 'h4'

  header = new Header("h4", "h4: Hello Navy world!", {
    color: "navy"
  });
  wrapperContainer.add(header);
  header.setStyleRule("color", "navy");

  header = new Header("h5", "h5: Hello Default Color World!");
  wrapperContainer.add(header);

  let paragraph = new Paragraph("p: This is a paragraph");
  wrapperContainer.add(paragraph);

  const container = new Container();
  wrapperContainer.add(container);

  header = new Header("h1", "h1: Hello Orange World!");
  container.add(header);
  header.setColor("white");
  header.setBackgroundColor("orange");

  header = new Header("h2", "h2: Hello Tan World!");
  container.add(header);
  header.setStyleRule("color", "white");
  header.setStyleRule("backgroundColor", "tan");

  header = new Header("h3", "h3: Hello Green World!", {
    style: {
      backgroundColor: "green",
      color: "white"
    }
  });
  container.add(header);

  paragraph = new Paragraph("p: This is a paragraph with default font height");
  container.add(paragraph);

  paragraph = new Paragraph("p: This is a paragraph 150% default font height");
  container.add(paragraph);
  paragraph.setFontSize("150%");

  paragraph = new Paragraph("p: This is a paragraph with double default font height");
  container.add(paragraph);
  paragraph.setStyleRule("fontSize", "2rem");

  return wrapperContainer;
}

export default bootstrap00;
