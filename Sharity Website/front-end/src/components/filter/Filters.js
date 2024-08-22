import React from "react";
import { Dropdown } from "react-bootstrap";
import BoolFilter from "./BoolFilter";
import FilterPill from "./FilterPill";

export default function Filters({ filters, setCurrentMapFilter }) {
  return (
    <>
      {filters.map((filter, fIdx) => {
        // used for showing "saved" filter only for signed-in members
        if ("show" in filter && !filter.show()) return null;

        return (
          <Dropdown className="d-inline-block mr-2" key={fIdx}>
            {filter.bool ? (
              <BoolFilter
                state={filter.currentFilter === 0}
                toggleState={() => filter.currentFilter === 0
                  ? setCurrentMapFilter(filter.name, filter.options.find((el) => el.id === -1))
                  : setCurrentMapFilter(filter.name, filter.options.find((el) => el.id === 0))}
              >
                {filter.name}
              </BoolFilter>
            ) : (
                <>
                  {filter.options.find((el) => el.id === filter.currentFilter).name === "All" ? (
                    <FilterPill selected={false}>
                      {filter.name}
                    </FilterPill>
                  ) : (
                      <FilterPill selected>
                        {filter.name}:{" "}
                        {filter.options.find((el) => el.id === filter.currentFilter).name}
                      </FilterPill>
                    )}

                  <Dropdown.Menu>
                    {filter.options.map((option, oIdx) => (
                      <Dropdown.Item
                        key={oIdx}
                        onSelect={() => setCurrentMapFilter(filter.name, option)}
                        eventKey={option.id}
                        active={filter.currentFilter === option.id}
                      >
                        {option.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>

                </>
              )
            }
          </Dropdown>
        )
      })}
    </>
  );
}
