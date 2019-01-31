import {
  Table,
  Table__head,
  Table__foot,
  Table__body,
  Table__row,
  Table__header
} from '@atoms/Table/Table';
import Heading from '@atoms/Heading/Heading';

const page = () => (
  <div>
    <Heading>JS</Heading>
    <Table>
      <Table__head>
        <Table__row>
          <Table__header>Atomic Level</Table__header>
          <Table__header>File</Table__header>
          <Table__header>Size</Table__header>
        </Table__row>
      </Table__head>

      <Table__body />

      <Table__foot />
    </Table>
    <Heading>CSS</Heading>
    <Table>
      <Table__head>
        <Table__row>
          <Table__header>Atomic Level</Table__header>
          <Table__header>File</Table__header>
          <Table__header>Size</Table__header>
        </Table__row>
      </Table__head>

      <Table__body />

      <Table__foot />
    </Table>
    <Heading>Images</Heading>
    <Table>
      <Table__head>
        <Table__row>
          <Table__header>Atomic Level</Table__header>
          <Table__header>File</Table__header>
          <Table__header>Size</Table__header>
        </Table__row>
      </Table__head>

      <Table__body />

      <Table__foot />
    </Table>
    <Heading>Fonts</Heading>
    <Table>
      <Table__head>
        <Table__row>
          <Table__header>Atomic Level</Table__header>
          <Table__header>File</Table__header>
          <Table__header>Size</Table__header>
        </Table__row>
      </Table__head>

      <Table__body />

      <Table__foot />
    </Table>
  </div>
);

export default page();
