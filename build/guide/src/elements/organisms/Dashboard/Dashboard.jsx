import Rhythm from '@guideAtoms/Rhythm/Rhythm';
import Heading from '@guideAtoms/Heading/Heading';
import Link from '@guideAtoms/Link/Link';
import Brand from '@molecules/Brand/assets/logo.svg';
import Image from '@atoms/Image/Image';
import { List, List__item } from '@guideAtoms/List/List';
import Package from '@root/package.json';

export const Dashboard = () => {
  const classStack = Utils.createClassStack([
    'guide__dashboard'
  ]);

  return (
    <Rhythm tagName="section" className={classStack}>
      <Image src={Brand} alt={Package.name} style={{ width: '50%' }} />
      <div className="flex flex--justify-items-between">
        <Rhythm>
          <Heading level="h3">Welcome to {Package.name} {Package.version} Component Guide</Heading>
          <p>Use this guide in both development and review of atomicly organized components.</p>
          <List>
            <List__item>
              <Link href="/#" target="_blank">Jira Space</Link>
            </List__item>
          </List>

          <Heading level="h3" variant="roboto">Unslated tools</Heading>
          <p>Commonly used project tools: (found under main menu-&gt;tools)</p>
          <List>
            <List__item>
              <Link href="/tools/Colors">Project Colors</Link>
            </List__item>
            <List__item>
              <Link href="/tools/Icons">Project Icons</Link>
            </List__item>
            <List__item>
              <Link href="/tools/Typography">Project Typography</Link>
            </List__item>
          </List>
        </Rhythm>

        <Rhythm>
          <Heading level="h3">Unslated Documentation</Heading>
          <List>
            <List__item>
              <Link href="https://github.com/drolsen/Unslated/blob/master/README.md" target="_blank">Getting Started</Link>
            </List__item>
            <List__item>
              <Link href="https://github.com/drolsen/Unslated/wiki/JS" target="_blank">JS Features</Link>
            </List__item>
            <List__item>
              <Link href="https://github.com/drolsen/Unslated/wiki/CSS" target="_blank">CSS Features</Link>
            </List__item>
            <List__item>
              <Link href="https://github.com/drolsen/Unslated/wiki/JSX" target="_blank">JSX Features</Link>
            </List__item>
            <List__item>
              <Link href="https://github.com/drolsen/Unslated/wiki/Examples" target="_blank">JSX Examples</Link>
            </List__item>
            <List__item>
              <Link href="https://github.com/drolsen/Unslated/wiki/Elements" target="_blank">Creating Elements</Link>
            </List__item>
          </List>
        </Rhythm>
      </div>
    </Rhythm>
  );
};


export default Dashboard;
