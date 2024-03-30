import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as RATree from "react-accessible-treeview";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";
import { ChevronRight, Plus, Minus } from "react-feather";
import { CustomScroll } from "react-custom-scroll";
import { motion } from "framer-motion";

import { Checkbox } from ".";
import { tw, useTree } from "@/lib";
// @ts-ignore
import { tree } from "@/components/layout/grid.module.css";

export function TreeView() {
    const { open, treeData, initialSelectedIds, colors, setOpen, onCheck } =
        useTree();

    return (
        <CollapsiblePrimitive.Root
            className={tw(tree, "z-10", "flex", "flex-col")}
            open={open}
            onOpenChange={() => setOpen(!open)}
        >
            <CollapsiblePrimitive.Trigger
                className={tw(
                    "class-view-trigger",
                    "bg-gray-50",
                    "text-gray-900",
                    "hover:bg-gray-300",
                    "active:text-gray-600",
                    "p-1",
                    "font-bold",
                    "w-6",
                    "self-start"
                )}
            >
                {!open ? <Plus size={16} /> : <Minus size={16} />}
            </CollapsiblePrimitive.Trigger>
            <motion.div
                animate={{
                    height: open ? "100%" : 0,
                    opacity: open ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                className={tw("overflow-y-auto", "cv")}
            >
                <CustomScroll
                    heightRelativeToParent={"100%"}
                >
                    <CollapsiblePrimitive.Content
                        forceMount={true}
                        className={tw(
                            "class-view-content",
                            "border-t-2",
                            "text-wrap",
                            "bg-black/80",
                            "text-gray-300"
                        )}
                    >
                        <Tree
                            treeData={treeData}
                            initialSelectedIds={initialSelectedIds}
                            onCheck={onCheck}
                        />
                    </CollapsiblePrimitive.Content>
                </CustomScroll>
            </motion.div>
        </CollapsiblePrimitive.Root>
    );
}

export function Tree({ treeData, initialSelectedIds, onCheck }: {
    treeData: RATree.INode<IFlatMetadata>[],
    initialSelectedIds: RATree.NodeId[],
    onCheck: (props: RATree.ITreeViewOnSelectProps) => void
}) {
    return (
        <div
            className={tw(
                "cv",
                "h-full",
                "flex",
                "flex-col",
                "text-wrap"
            )}
        >
            <RATree.default
                data={treeData}
                aria-label="Tree View"
                multiSelect
                propagateSelect
                propagateSelectUpwards
                togglableSelect
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
                                    typeof element.metadata
                                        ?.color !== "undefined"
                                        ? (element.metadata
                                            .color as string)
                                        : undefined,
                            }}
                        >
                            {isBranch && (
                                <ChevronRight
                                    size={16}
                                    className={tw(
                                        isExpanded
                                            ? "rotate-90"
                                            : ""
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
                            <label
                                htmlFor={element.id as string}
                            >
                                {element.name}
                            </label>
                        </div>
                    );
                }}
            />
        </div>
    )
}