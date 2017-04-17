import React from 'react';
import {
    BooleanField,
    BooleanInput,
    CheckboxGroupInput,
    Create,
    Datagrid,
    DateField,
    DateInput,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    FormTab,
    ImageField,
    ImageInput,
    List,
    LongTextInput,
    NumberField,
    NumberInput,
    ReferenceManyField,
    Responsive,
    RichTextField,
    Show,
    ShowButton,
    SimpleForm,
    SimpleList,
    SimpleShowLayout,
    TabbedForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import RichTextInput from 'aor-rich-text-input';
import { translate } from 'admin-on-rest';
import Chip from 'material-ui/Chip';
import * as PropTypes from "react/lib/ReactPropTypes";

const QuickFilter = translate(({ label, translate }) => <Chip>{translate(label)}</Chip>);

const EmailField = ({record = {},source}) => <a href={`mailto:${record[source]}`}>{record[source]}</a>;
EmailField.propTypes = {
    source: PropTypes.string.isRequired,
    record: PropTypes.object
};

const UserFilter = ({ ...props }) => (
    <Filter {...props}>
        <TextInput label="user.list.search" source="q" alwaysOn />
        <TextInput source="username" defaultValue="Qui tempore rerum et voluptates" />
        <QuickFilter label="resources.users.fields.commentable" source="commentable" defaultValue={true} />
    </Filter>
);

const titleFieldStyle = { maxWidth: '20em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
export const UserList = ({ ...props }) => (
    <List {...props} filters={<UserFilter />} sort={{ field: 'published_at', order: 'DESC' }}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.username}/>
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="username" style={titleFieldStyle} />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const UserTitle = translate(({ record, translate }) => {
    return <span>{record ? translate('user.edit.title', { title: record.title }) : ''}</span>;
});

export const UserCreate = ({ ...props }) => (
    <Create {...props}>
        <SimpleForm defaultValue={{ average_note: 0 }} validation={(values) => {
            const errors = {};
            ['title', 'teaser'].forEach((field) => {
                if (!values[field]) {
                    errors[field] = ['Required field'];
                }
            });

            if (values.average_note < 0 || values.average_note > 5) {
                errors.average_note = ['Should be between 0 and 5'];
            }

            return errors;
        }}>
            <TextInput source="title" />
            <TextInput source="password" type="password" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <RichTextInput source="body" />
            <DateInput source="published_at" defaultValue={() => new Date()} />
            <NumberInput source="average_note" />
            <BooleanInput source="commentable" defaultValue={true} />
        </SimpleForm>
    </Create>
);

export const UserEdit = ({ ...props }) => (
    <Edit title={<UserTitle />} {...props}>
        <TabbedForm defaultValue={{ average_note: 0 }}>
            <FormTab label="user.form.summary">
                <DisabledInput source="id" />
                <TextInput source="username" validation={{ required: true }} />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const UserShow = ({ ...props }) => (
    <Show title={<UserTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" stripTags={false} />
            <DateField source="published_at" style={{ fontStyle: 'italic' }} />
            <TextField source="average_note" />
            <ReferenceManyField label="resources.users.fields.comments" reference="comments" target="user_id" sort={{ field: 'created_at', order: 'DESC' }}>
                <Datagrid selectable={false}>
                    <DateField source="created_at" />
                    <TextField source="author.name" />
                    <TextField source="body" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
            <TextField source="views" />
        </SimpleShowLayout>
    </Show>
);
