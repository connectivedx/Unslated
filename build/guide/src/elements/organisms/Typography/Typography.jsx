import Heading from '@guideAtoms/Heading/Heading';
import Rhythm from '@guideAtoms/Rhythm/Rhythm';

import {
  List,
  List__item
} from '@guideAtoms/List/List';

import {
  Card,
  Card__body,
  Card__deck
} from '@guideMolecules/Card/Card';

export const Typography = () => {
  const classStack = Utils.createClassStack([
    'guide__typography',
    'flex flex--column flex--justify-content-between'
  ]);

  return (
    <Card className={classStack}>
      <Card__body>
        <Rhythm variant="large">
          <Heading level="h3">The Serif</Heading>
          <p className="SgType-size--20">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />a b c d e f g h i j k l m n o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9</p>

          <div><strong>Bold</strong> - <i>Italic</i> - <u>Underline</u> - <strong><i>Bold Italic</i></strong></div>

          <Card__deck className="grid--auto-fill">
            <Card className="SgType weight--light style--normal SgType--block">
              <Card__body>
                <span className="size--49">A</span><span className="size--28">a</span>
                <hr />
                Light 100
              </Card__body>
            </Card>
            <Card className="SgType weight--regular style--normal SgType--block">
              <Card__body>
                <span className="size--49">A</span><span className="size--28">a</span>
                <hr />
                Regular 400
              </Card__body>
            </Card>
            <Card className="SgType weight--regular style--italic SgType--block">
              <Card__body>
                <span className="size--49">A</span><span className="size--28">a</span>
                <hr />
                Regular Italic 400
              </Card__body>
            </Card>
            <Card className="SgType weight--semibold style--normal SgType--block">
              <Card__body>
                <span className="size--49">A</span><span className="size--28">a</span>
                <hr />
                Semibold 600
              </Card__body>
            </Card>
            <Card className="SgType weight--bold style--normal SgType--block">
              <Card__body>
                <span className="size--49">A</span><span className="size--28">a</span>
                <hr />
                Bold 700
              </Card__body>
            </Card>
          </Card__deck>

          <Rhythm>
            <Heading level="h1">Heading One 39px/54px</Heading>
            <Heading level="h2">Heading Two 39px/45px</Heading>
            <Heading level="h3">Heading Three 26px/34px</Heading>
            <Heading level="h4">Heading Four 22px/28px</Heading>
            <Heading level="h5">Heading Five 20px/24px</Heading>
            <Heading level="h6">Heading Six 18px/20px</Heading>
          </Rhythm>

          <p>{Utils.ipsum('paragraph', 2)}</p>
          <p>{Utils.ipsum('paragraph', 3)}</p>

          <div className="flex flex--justify-content-between">
            <div>
              <Heading level="h3">Ordered lists</Heading>
              <List tagName="ol" variant="ordered">
                <List__item>Item one</List__item>
                <List__item>Item two</List__item>
                <List__item>Item three</List__item>
                <List__item>Item Four</List__item>
                <List__item>Item Five</List__item>
                <List__item>Item Size</List__item>
              </List>
            </div>

            <div>
              <Heading level="h3">Unordered lists</Heading>
              <List tagName="ul">
                <List__item>Item one</List__item>
                <List__item>Item two</List__item>
                <List__item>Item three</List__item>
                <List__item>Item Four</List__item>
                <List__item>Item Five</List__item>
                <List__item>Item Size</List__item>
              </List>
            </div>

            <div>
              <Heading level="h3">Blank lists</Heading>
              <List tagName="ul" variant="blank">
                <List__item>Item one</List__item>
                <List__item>Item two</List__item>
                <List__item>Item three</List__item>
                <List__item>Item Four</List__item>
                <List__item>Item Five</List__item>
                <List__item>Item Size</List__item>
              </List>
            </div>
          </div>
        </Rhythm>
      </Card__body>
    </Card>
  );
};


export default Typography;
