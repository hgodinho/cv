import * as RATree from "react-accessible-treeview";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";
import { ChevronRight } from "react-feather";
import { CustomScroll } from "react-custom-scroll";

import { Checkbox } from ".";
import { tw, useTree } from "@/lib";
import { useTheme } from "@/provider";

export function TreeView() {
    const { treeData, initialSelectedIds, onCheck } = useTree();

    return (
        <CustomScroll heightRelativeToParent={"100%"}>
            <Tree
                treeData={treeData}
                initialSelectedIds={initialSelectedIds}
                onCheck={onCheck}
            />
        </CustomScroll>
    );
}

export function Tree({
    treeData,
    initialSelectedIds,
    onCheck,
}: {
    treeData: RATree.INode<IFlatMetadata>[];
    initialSelectedIds: RATree.NodeId[];
    onCheck: (props: RATree.ITreeViewOnSelectProps) => void;
}) {
    const {
        sizes: { icon },
    } = useTheme();
    return (
        <div className={tw("cv", "h-full", "flex", "flex-col", "text-wrap")}>
            <RATree.default
                data={treeData}
                aria-label="Tree View"
                // multiSelect
                // propagateSelect
                // propagateSelectUpwards
                // togglableSelect
                defaultSelectedIds={initialSelectedIds}
                onSelect={onCheck}
                nodeRenderer={({
                    element,
                    isBranch,
                    isExpanded,
                    isSelected,
                    isHalfSelected,
                    getNodeProps,
                    level,
                    handleSelect,
                    handleExpand,
                }) => {
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
                                    typeof element.metadata?.color !==
                                        "undefined"
                                        ? (element.metadata.color as string)
                                        : undefined,
                            }}
                        >
                            {isBranch && (
                                <ChevronRight
                                    size={icon}
                                    className={tw(
                                        isExpanded ? "rotate-90" : ""
                                    )}
                                />
                            )}
                            <Checkbox
                                id={element.id as string}
                                className={tw("mr-2")}
                                variant={
                                    isHalfSelected
                                        ? "some"
                                        : isSelected
                                            ? "all"
                                            : "none"
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
                            />
                            <label htmlFor={element.id as string}>
                                {element.name}
                            </label>
                        </div>
                    );
                }}
            />
        </div>
    );
}
