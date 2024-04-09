import { useMemo } from "react";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";
import { ChevronRight } from "react-feather";
import * as RATree from "react-accessible-treeview";

import { Checkbox } from ".";
import { tw, useTree } from "@/lib";
import { useTheme, useFilterContext } from "@/provider";
import { Link as LinkPrimitive, Scroll } from "@/components";

export type TreeTypeEnum = "filter" | "link";

export type TreeViewProps = {
    mode: TreeTypeEnum;
    settings: boolean;
};

export function TreeView({ mode, settings }: TreeViewProps) {
    const { treeData, initialSelectedIds, onCheck } = useTree();
    return (
        <div
            className={tw(
                "flex",
                "flex-col",
                "p-2",
                settings ? tw("max-h-60", "md:max-h-80") : "max-h-[500px]"
            )}
        >
            <Scroll>
                <Tree
                    treeData={treeData}
                    initialSelectedIds={initialSelectedIds}
                    onCheck={onCheck}
                    mode={mode}
                />
            </Scroll>
        </div>
    );
}

export type TreeProps = {
    treeData: RATree.INode<IFlatMetadata>[];
    initialSelectedIds: RATree.NodeId[];
    mode: TreeViewProps["mode"];
    onCheck: (props: RATree.ITreeViewOnSelectProps) => void;
};

export function Tree({
    treeData,
    initialSelectedIds,
    onCheck,
    mode = "link",
}: TreeProps) {
    const { filterProps } = useMemo(() => {
        let filterProps = {};
        if (mode === "filter") {
            filterProps = {
                multiSelect: true,
                propagateSelect: true,
                propagateSelectUpwards: true,
                togglableSelect: true,
                onSelect: onCheck,
            };
        }

        return {
            filterProps,
        };
    }, [mode, treeData]);

    return (
        <div className={tw("cv", "mr-4", "mt-2", "flex", "flex-col")}>
            <RATree.default
                data={treeData}
                aria-label="Tree View"
                defaultSelectedIds={initialSelectedIds}
                {...filterProps}
                nodeRenderer={(props) => {
                    return <Branch mode={mode} {...props} />;
                }}
            />
        </div>
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

    return (
        <div
            {...getNodeProps({
                onClick: handleExpand,
            })}
            className={tw(
                "flex",
                "flex-row",
                "items-center",
                "border-b-2",
                "hover:text-gray-50",
                "gap-1",
                "py-2"
            )}
            style={{
                marginLeft: 32 * (level - 1),
                borderColor:
                    typeof element.metadata?.color !== "undefined"
                        ? (element.metadata.color as string)
                        : undefined,
            }}
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
    return (
        <div className={tw("mr-2")}>
            {isLink ? (
                <LinkPrimitive
                    href={filterValue(element.metadata?.id as string)}
                >
                    {element.name}
                </LinkPrimitive>
            ) : (
                <span>{element.name}</span>
            )}
        </div>
    );
}
