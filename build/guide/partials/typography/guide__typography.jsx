import Rhythm from '@atoms/Rhythm/Rhythm';
import {
  Card,
  Card__body,
  Card__deck
} from '@molecules/Card/Card';

export const Guide__typography = () => {
  const classStack = Utils.createClassStack([
    'guide__typography',
    'flex flex--column flex--justify-content-between'
  ]);

  return (
    <Card className={classStack}>
      <Card__body>
        <Rhythm variant="large">
          <h2 className="heading heading--h2 weight--semibold">The Serif</h2>
          <p className="SgType-size--20">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />a b c d e f g h i j k l m n o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9</p>
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
            <h1 className="heading heading--serif heading--h1 weight--semibold">Heading One 39px/54px</h1>
            <h2 className="heading heading--serif heading--h2 heading--thin">Heading Two 39px/45px</h2>
            <h3 className="heading heading--serif heading--h3 heading--thin">Heading Three 26px/34px</h3>
            <h4 className="heading heading--serif heading--h4 heading--thin">Heading Four 22px/28px</h4>
            <h5 className="heading heading--serif heading--h5 heading--thin">Heading Five 20px/24px</h5>
            <h6 className="heading heading--serif heading--h6 heading--thin">Heading Six 18px/20px</h6>
          </Rhythm>
          <p className="SgType-size--20">The Serif Plain 16/20. Ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim.</p>
          <p className="SgType-size--15">The Serif Plain 14/15. Ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim. Fusce mattis justo vitae congue varius. Suspendisse auctor dapibus ornare. Praesent venenatis lacus a sem interdum tempor et vitae magna. Aenean vel consectetur odio. Curabitur malesuada scelerisque massa varius volutpat.</p>
        </Rhythm>
      </Card__body>
    </Card>
  );
};


export default Guide__typography;
