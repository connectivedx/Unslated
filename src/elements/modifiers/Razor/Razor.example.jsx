import {
  Using,
  Inherit,
  Model,
  Call,
  Code,
  Helper,
  Html,
  If,
  Else
} from '@razor';

import Button from '@atoms/Button/Button'; // Button used for example sakes

export default [{
  examples: [
    {
      name: '@using',
      description: '',
      exports: '',
      component: (
        <pre devonly="true">
          { /* Here we are envokng the "path" prop to load in a external resource */ }
          <Using path="Sitecore.StringExtensions" />

          { /* Or you can envoke the "use" prop on that same external resource, but in block form */ }
          <Using use="Sitecore.StringExtensions">
            <Button>Test</Button>
          </Using>
        </pre>
      ),
      options: {
        showAsCode: true
      },
      notes: ''
    }, {
      name: '@inherits',
      description: '',
      exports: '',
      component: (
        // Here we are inheriting an external resource by again envoking the "path" prop
        <pre devonly="true">
          <Inherit path="Sitecore.StringExtensions" />
        </pre>
      ),
      notes: ''
    }, {
      name: '@Model',
      description: '',
      exports: '',
      component: (
        <pre devonly="true">
          <Model path="Sitecore.Project.Thing" />

          <Button>
            <Model use="Things.Button.RawValue" />
          </Button>
        </pre>
      ),
      notes: ''
    }, {
      name: '@if',
      description: '',
      exports: '',
      component: (
        <pre devonly="true">
          <If condition="ExperienceBlockContext.CurrentOrNull == null">
            <Button>Hello world</Button>
          </If>
        </pre>
      ),
      notes: ''
    }, {
      name: '@if/else',
      description: '',
      exports: '',
      component: (
        <pre devonly="true">
          <If condition="ExperienceBlockContext.CurrentOrNull == null">
            <Button>Button A</Button>
          </If>
          <Else>
            <Button>Button B</Button>
          </Else>
        </pre>
      ),
      notes: ''
    }, {
      name: '@Html',
      description: '',
      exports: '',
      component: (
        <pre devonly="true">
          <Html use="Partial('/Sitecore/Components/Thing.cshtml', Model)" />
        </pre>
      ),
      notes: ''
    }, {
      name: '@Helper',
      description: '',
      exports: '',
      component: (
        <pre devonly="true">
          <Helper use="RenderExperienceBlockContent()">
            <Button><Call use="Sitecore.Placeholder('beans')" /></Button>
          </Helper>
        </pre>
      ),
      notes: ''
    }, {
      name: '@ code fragments',
      description: '',
      exports: '',
      component: (
        <pre devonly="true">
          <Code>
            int x = 123;
            string y = "because.";
          </Code>
        </pre>
      ),
      notes: ''
    }
  ]
}];
