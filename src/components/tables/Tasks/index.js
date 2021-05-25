import React, { useState, useEffect } from "react";
import _orderBy from "lodash/orderBy";
import DatePicker from "react-mobile-datepicker";
import dynamic from 'next/dynamic';
import dayjs from "dayjs";

import s from "./index.module.scss";
import { dateConfig } from "@constants/config";
import Button from "@common/Button";
import Input from "@common/Input";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const Tasks = props => {

    const { data = [], isLeader, isUpdating, updateTask, selectType, theme } = props;

    const [sortBy, setSortBy] = useState({ field: 'name', asc: true });
    const [edit, setEdit] = useState(-1);
    const [values, setValues] = useState({});
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);

    const sort = field => () => {
        if (edit === -1)
            setSortBy({ field: field, asc: sortBy.field !== field ? true : !sortBy.asc });
    }

    const onEdit = row => {
        setEdit(row);
        setValues({ ...data[row] });
    }

    const cancelEdit = () => {
        setEdit(-1);
        setValues({});
    }

    const save = () => {
        updateTask(values);
        setEdit(-1);
        setValues({});
    }

    const onChange = field => e => {
        let val = { ...values };
        val[field] = e.target.value;
        setValues(val);
    }

    const dateSelect = value => {
        setOpen(false);
        let val = { ...values };
        val["dueDate"] = dayjs(value).format("YYYY-MM-DD");
    }

    useEffect(() => {
        const order = sortBy.asc ? 'asc' : 'desc';
        setList(_orderBy(data, [sortBy.field, 'name'], [order, order]));
    }, [data, sortBy]);

    useEffect(() => {
        if (open) {
            let picker = document.querySelector(
                "body > div.Modal-Portal > div > .datepicker"
            );
            let confirm = document.querySelector(
                "body > div.Modal-Portal > div > div > div.datepicker-navbar > a:nth-child(1)"
            );
            let cancel = document.querySelector(
                "body > div.Modal-Portal > div > div > div.datepicker-navbar > a:nth-child(2)"
            );
            picker.style.maxWidth = "650px";
            picker.style.left = "50%";
            picker.style.transform = "translate(-50%, 0)"
            confirm.innerHTML = "Confirm";
            cancel.innerHTML = "Cancel";
        }
    }, [open])

    console.log(data)

    return (
        <div className={s.tableContainer}>
            <DatePicker
                isOpen={open}
                onSelect={dateSelect}
                onCancel={() => setOpen(false)}
                dateConfig={dateConfig}
                theme={theme}
                value={values.dateOfBirth ? new Date(values.dateOfBirth) : new Date()}
                min={new Date()}
                showCaption={true}
                showHeader={false}
            />
            <table>
                <thead>
                    <tr>
                        <th className={`${s.leftAlign} ${s.pointer}`} onClick={sort('task')}>
                            Task
                            {sortBy.field === 'task'
                                ? <i className={`${s.sort} ${s.active} ${sortBy.asc ? 'icon-chevron_up' : 'icon-chevron_down'}`} />
                                : <i className={`${s.sort} icon-chevron_up`} />
                            }
                        </th>
                        <th className={`${s.leftAlign} ${s.noPhone} ${s.pointer}`} onClick={sort('name')}>
                            Created By
                            {sortBy.field === 'name'
                                ? <i className={`${s.sort} ${s.active} ${sortBy.asc ? 'icon-chevron_up' : 'icon-chevron_down'}`} />
                                : <i className={`${s.sort} icon-chevron_up`} />
                            }
                        </th>
                        <th className={`${s.noTablet}`}>Type</th>
                        <th className={`${s.leftAlign}`}>Due Date</th>
                        <th className={s.alignRight}>Action</th>
                    </tr>
                </thead>
                <tbody className={s.TableFont}>
                    {list.map((item, index) => {
                        return edit === index
                            ? (
                                <tr key={index}>
                                    <td className={`${s.leftAlign}`}>
                                        <Input
                                            label="Task"
                                            name="task"
                                            handleChange={onChange("task")}
                                            value={values.task}
                                        />
                                    </td>
                                    <td className={`${s.noPhone} ${s.leftAlign}`}>{item.username}</td>
                                    <td className={`${s.noTablet}`}>
                                        <Input
                                            label="Due Date"
                                            name="dueDate"
                                            value={values.dueDate}
                                            focusCallback={() => setOpen(true)}
                                        />
                                    </td>
                                    <td className={`${s.leftAlign}`}>
                                        <p>{values.ser_prof_mobile_prim}</p>
                                        <p className={s.alternate}>
                                            <MultiSelect
                                                options={selectType}
                                                selectedValues={values.type}
                                                onSelect={(_, item) => setFieldValue('type', item.id)}
                                                display="name"
                                                name="type"
                                                placeholder={!values.type ? 'Type' : ''}
                                                key="id"
                                                label="Type"
                                                multiple={false}
                                                showInput={!values.type}
                                            />
                                        </p>
                                    </td>
                                    <td className={s.alignRight}>
                                        <div className={s.flex}>
                                            <Button
                                                text="Cancel"
                                                type="grey"
                                                variant="hollow"
                                                onClick={() => cancelEdit()}
                                                disabled={isUpdating}
                                            />
                                            <Button
                                                text="Save"
                                                variant="hollow"
                                                onClick={() => save()}
                                                disabled={isUpdating}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                            : (
                                <tr key={index}>
                                    <td className={`${s.leftAlign}`}>{item.task}</td>
                                    <td className={`${s.noPhone} ${s.leftAlign}`}>{item.username}</td>
                                    <td className={`${s.noTablet}`}>
                                        <div className={`${s.type} ${s[item.type_name]}`} />
                                    </td>
                                    <td className={`${s.leftAlign}`}>{item.dueDate}</td>
                                    <td className={s.alignRight}>
                                        {!item.isComplete
                                            ? <div className={s.flex}>
                                                <p
                                                    className={s.edit}
                                                    onClick={() => onEdit(index)}
                                                >
                                                    Edit
                                                </p>
                                                <Button
                                                    text="Done"
                                                    variant="hollow"
                                                    onClick={() => updateTask({ ...item, isComplete: true })}
                                                    disabled={isUpdating}
                                                />
                                            </div>
                                            : <div>Completed</div>
                                        }
                                    </td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Tasks
