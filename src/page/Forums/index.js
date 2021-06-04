import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import s from "./index.module.scss";
import { noForums } from "@constants/images";
import Forum from "@cards/Forum";
import Input from "@common/Input";
import Button from "@common/Button";
import PageContainer from "@hoc/PageContainer";
import EmptyState from "@common/EmptyState";

const MultiSelect = dynamic(() => import("@common/MultiSelect"), { ssr: false });

const Forums = props => {

  const {
    selectForums, selectUserInfo, d__globalModalFlag, selectCategory
  } = props;

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [forums, setForums] = useState([]);

  const filter = () => {
    const _forums = Object.assign(selectForums, []);
    if (!categories.length && !search)
      setForums(_forums);
    else {
      const filteredForums = [];
      if (!!categories.length) {
        _forums.forEach(forum => {
          let add = false;
          forum.categories.forEach(category => {
            if (category.category === categories) add = true;
          })
          if (add) filteredForums.push(forum);
        })
      } else {
        selectForums.forEach(forum => filteredForums.push(forum));
      }
      if (!!search) {
        const _forums = Object.assign(filteredForums, []);
        const searchedForums = _forums.filter(forum => (
          forum.name.toLowerCase().indexOf(search) !== -1 || 
          forum.description.toLowerCase().indexOf(search) !== -1
        ))
        setForums(searchedForums)
      } else setForums(filteredForums);
    }
  }

  useEffect(() => {
    setForums(selectForums);
    filter();
  }, [selectForums]);

  useEffect(() => {
    filter();
  }, [categories, search]);

  return (
    <PageContainer active={"forums"} name="Forums">
      <div className={s.filterAndSearch}>
        <div className={s.search}>
          <Input
            value={search}
            handleChange={e => setSearch(e.target.value)}
            placeholder={"Search"}
            noBorder={true}
            showEdit={true}
            secondaryText={<i className={`icon-search ${s.searchIcon}`} />}
          />
        </div>
        <MultiSelect
          options={selectCategory}
          selectedValues={categories}
          onSelect={(_, item) => setCategories(item.id)}
          onRemove={(_, item) => setCategories([])}
          display="name"
          name="categories"
          emptyMessage="No categories available."
          placeholder={!categories.length ? 'Category' : ''}
          key="id"
          label="Category"
          selectionLimit={1}
          closeOnSelect={true}
        />
      </div>
      <div className={s.container}>
        <div className={s.buttonContainer}>
          <Button
            text="Create Forums"
            variant="hollow"
            type="message"
            onClick={() => d__globalModalFlag('forum')}
            width="150px"
          />
        </div>
        <div className={s.forumContainer}>
          {!!selectForums.length
            ? forums.length
              ? forums.map((item, index) => (
                <Forum
                  key={`forum-${index}`}
                  item={item}
                />
              ))
              : <div className={s.noForums}>
                There are no projects available. Be the first one to create.
              </div>
            : <EmptyState
                message="There are no projects available. Be the first one to create."
                image={noForums}
                text="Create Forum"
                link={() => d__globalModalFlag('forum')}
            />
          }
        </div>
      </div>
    </PageContainer>
  )
}

export default Forums
