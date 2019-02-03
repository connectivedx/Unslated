import Rhythm from '@atoms/Rhythm/Rhythm';

const page = () => (
  <React.Fragment>
    <section>
      <Rhythm variant="large">
        <h2 className="heading heading--h2 heading--semibold">Open Sans</h2>
        <p className="SgType-size--20">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />a b c d e f g h i j k l m n o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9</p>
        <div className="grid--auto-fill">
          <div className="SgType SgType-weight--regular SgType-style--normal SgType--block">
            <span className="SgType-size--49">A</span><span className="SgType-size--28">a</span>
            <hr />
            Regular 400
          </div>
          <div className="SgType SgType-weight--regular SgType-style--italic SgType--block">
            <span className="SgType-size--49">A</span><span className="SgType-size--28">a</span>
            <hr />
            Regular Italic 400
          </div>
          <div className="SgType SgType-weight--semibold SgType-style--normal SgType--block">
            <span className="SgType-size--49">A</span><span className="SgType-size--28">a</span>
            <hr />
            Semibold 600
          </div>
          <div className="SgType SgType-weight--bold SgType-style--normal SgType--block">
            <span className="SgType-size--49">A</span><span className="SgType-size--28">a</span>
            <hr />
            Bold 700
          </div>
        </div>
        <Rhythm>
          <h1 className="heading heading--h1 heading--semibold">Heading One 30px/43px</h1>
          <h2 className="heading heading--h2 heading--semibold">Heading Two 26px/34px</h2>
          <h3 className="heading heading--h3 heading--normal">Heading Three 24px/30px</h3>
          <h4 className="heading heading--h4 heading--semibold">Heading Four 20px/24px</h4>
          <h5 className="heading heading--h5 heading--normal">Heading Five 18px/22px</h5>
          <h6 className="heading heading--h6 heading--semibold">Heading Six 16px/18px</h6>
          <h2 className="heading heading--label-1 heading--bold">Heading Label 1 13px</h2>
          <h6 className="heading heading--label-2 heading--semibold">Heading Label 2 11px</h6>
        </Rhythm>
        <p className="SgType-size--19">Open Sans Regular 17/19. Ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim. Fusce mattis justo vitae congue varius. Suspendisse auctor dapibus ornare. Praesent venenatis lacus a sem interdum tempor et vitae magna. Aenean vel consectetur odio. Curabitur malesuada scelerisque massa varius volutpat.</p>
        <p>Open Sans Regular 14/16. Ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim. Fusce mattis justo vitae congue varius. Suspendisse auctor dapibus ornare. Praesent venenatis lacus a sem interdum tempor et vitae magna. Aenean vel consectetur odio. Curabitur malesuada scelerisque massa varius volutpat.</p>
        <p className="SgType-size--13">Open Sans Regular 12/13. Ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor.</p>
      </Rhythm>
      <Rhythm variant="large" className="SgType-family--serif">
        <h2 className="heading heading--h2 heading--semibold">The Serif</h2>
        <p className="SgType-size--20">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />a b c d e f g h i j k l m n o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9</p>
        <div className="grid--auto-fill">
          <div className="SgType SgType-weight--regular SgType-style--normal SgType--block">
            <span className="SgType-size--49">A</span><span className="SgType-size--28">a</span>
            <hr />
            Regular 400
          </div>
          <div className="SgType SgType-weight--regular SgType-style--italic SgType--block">
            <span className="SgType-size--49">A</span><span className="SgType-size--28">a</span>
            <hr />
            Regular Italic 400
          </div>
          <div className="SgType SgType-weight--semibold SgType-style--normal SgType--block">
            <span className="SgType-size--49">A</span><span className="SgType-size--28">a</span>
            <hr />
            Semibold 600
          </div>
        </div>
        <Rhythm>
          <h1 className="heading heading--serif heading--h1 heading--semibold">Heading One 39px/54px</h1>
          <h2 className="heading heading--serif heading--h2 heading--thin">Heading Two 39px/45px</h2>
          <h3 className="heading heading--serif heading--h3 heading--thin">Heading Three 26px/34px</h3>
          <h4 className="heading heading--serif heading--h4 heading--thin">Heading Four 22px/28px</h4>
          <h5 className="heading heading--serif heading--h5 heading--thin">Heading Five 20px/24px</h5>
          <h6 className="heading heading--serif heading--h6 heading--thin">Heading Six 18px/20px</h6>
        </Rhythm>
        <p className="SgType-size--20">The Serif Plain 16/20. Ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim.</p>
        <p className="SgType-size--15">The Serif Plain 14/15. Ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim. Fusce mattis justo vitae congue varius. Suspendisse auctor dapibus ornare. Praesent venenatis lacus a sem interdum tempor et vitae magna. Aenean vel consectetur odio. Curabitur malesuada scelerisque massa varius volutpat.</p>
      </Rhythm>
    </section>
  </React.Fragment>
);

page.options = {
  navless: false,
  headless: false
};

export default page;
