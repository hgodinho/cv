import { useMemo } from "react";
import { ChevronRight } from "react-feather";
import * as RATree from "react-accessible-treeview";
import { NavLink } from "react-router-dom";

import { Checkbox } from ".";
import { tw, useTree } from "@/lib";
import { useTheme, useFilterContext } from "@/provider";
import { Scroll } from "@/components";

export type TreeTypeEnum = "filter" | "link";

export type TreeViewProps = {
    mode: TreeTypeEnum;
    settings: boolean;
};

export function TreeView({ mode, settings }: TreeViewProps) {
    return (
        <div
            className={tw(
                "flex",
                "flex-col",
                "p-2",
                settings ? tw("max-h-52") : "max-h-[500px]"
            )}
        >
            <Scroll>
                <Tree mode={mode} />
            </Scroll>
        </div>
    );
}

export type TreeProps = {
    mode: TreeViewProps["mode"];
};

export function Tree({ mode = "link" }: TreeProps) {
    const { treeData, initialSelectedIds, onCheck } = useTree();

    const { filterProps } = useMemo(() => {
        let filterProps: Omit<RATree.ITreeViewProps, "data" | "nodeRenderer"> =
            {
                multiSelect: false,
                propagateSelect: false,
                propagateSelectUpwards: false,
                togglableSelect: true,
                onSelect: (props) => onCheck(props, mode),
            };
        if (mode === "filter") {
            filterProps = {
                multiSelect: true,
                propagateSelect: true,
                propagateSelectUpwards: true,
                togglableSelect: true,
                onSelect: (props) => onCheck(props, mode),
            };
        }
        return {
            filterProps,
        };
    }, [mode]);

    return (
        <nav className={tw("cv", "mr-4", "mt-2", "flex", "flex-col")}>
            <RATree.default
                {...filterProps}
                data={treeData}
                aria-label="Árvore de dados"
                className={tw(
                    "*:outline-none",
                    "focus:*:bg-gray-900",
                    "focus:*:font-bold"
                )}
                defaultSelectedIds={initialSelectedIds}
                expandOnKeyboardSelect={true}
                nodeRenderer={(props) => {
                    return <Branch mode={mode} {...props} />;
                }}
            />
        </nav>
    );
}

export function Branch({
    mode,
    level,
    element,
    isBranch,
    isExpanded,
    isSelected,
    isHalfSelected,
    getNodeProps,
    handleExpand,
    handleSelect,
}: RATree.INodeRendererProps & {
    mode: TreeViewProps["mode"];
}) {
    const {
        sizes: { icon },
    } = useTheme();

    const nodeProps = getNodeProps({
        onClick: handleExpand,
    });

    return (
        <div
            {...nodeProps}
            className={tw(
                nodeProps.className,
                "flex",
                "flex-row",
                "items-center",
                "border-b-2",
                "gap-1",
                "py-2",
                "cursor-pointer",
                "hover:text-blue-300",
                "focus:outline-none",
                "focus:font-bold",
                "focus:decoration-dotted",
                "focus:underline-offset-4",
                "focus:underline",
                "focus:text-gray-200",
                "focus:bg-gray-900"
            )}
            style={{
                marginLeft: 32 * (level - 1),
                borderColor:
                    typeof element.metadata?.color !== "undefined"
                        ? (element.metadata.color as string)
                        : undefined,
            }}
            aria-label={isBranch ? element.name : undefined}
        >
            {isBranch && (
                <ChevronRight
                    size={icon}
                    className={tw(isExpanded ? "rotate-90" : "")}
                />
            )}
            {mode === "filter" ? (
                <Checkbox
                    id={element.id as string}
                    className={tw("mr-2")}
                    variant={
                        isHalfSelected ? "some" : isSelected ? "all" : "none"
                    }
                    defaultChecked={
                        isHalfSelected
                            ? "indeterminate"
                            : isSelected
                            ? true
                            : false
                    }
                    onClick={(checked) => {
                        handleSelect(checked);
                        checked.stopPropagation();
                    }}
                    label={element.name}
                />
            ) : (
                <BranchLabel element={element} />
            )}
        </div>
    );
}

export function BranchLabel({ element }: { element: RATree.INode }) {
    const { filterValue } = useFilterContext();
    const isLink = typeof element.metadata?.id !== "undefined";
    return isLink ? (
        <NavLink
            to={filterValue(element.metadata?.id as string)}
            tabIndex={-1}
            className={({ isActive }) => {
                return tw(
                    isActive ? tw("text-blue-400", "font-bold") : "",
                    "mr-2"
                );
            }}
        >
            {element.name}
        </NavLink>
    ) : (
        <span className={tw("mr-2")}>{element.name}</span>
    );
}
