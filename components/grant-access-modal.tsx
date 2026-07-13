"use client";

import { useMemo, useState } from "react";
import {
  filterGroups,
  formatUserCount,
  getFrequentGroups,
  getGroupColor,
  USER_GROUPS,
  type UserGroup,
} from "@/lib/groups";

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.75 14.583a5.833 5.833 0 1 0 0-11.667 5.833 5.833 0 0 0 0 11.667Z"
        stroke="#95969D"
        strokeWidth="1.5"
      />
      <path
        d="m13.75 13.75 3.75 3.75"
        stroke="#95969D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2 12 12M12 2 2 12"
        stroke="#272727"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExclamationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill="#bb1919" />
      <path
        d="M10 5.75v5"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14" r="0.875" fill="#ffffff" />
    </svg>
  );
}
function ExternalLinkIcon() {
  return (
    <img
      src="/images/external-link.png"
      alt=""
      width={18}
      height={18}
      aria-hidden="true"
      className="shrink-0"
    />
  );
}

function CheckIcon({ color = "#272727" }: { color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3.5 8.25 3 3 6-6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChipRemoveIcon({ color }: { color: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BuildingIcon({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[18px] shrink-0"
      style={{
        backgroundColor: color,
        maskImage: "url(/images/building-icon.png)",
        WebkitMaskImage: "url(/images/building-icon.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function GroupAvatar({ group }: { group: UserGroup }) {
  const colors = getGroupColor(group.id);

  return (
    <span
      className="flex size-9 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <BuildingIcon color={colors.text} />
    </span>
  );
}

function GroupListItem({
  group,
  checked,
  onToggle,
}: {
  group: UserGroup;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-[14px] text-left"
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-lg ${
          checked
            ? "bg-[#202020]"
            : "border border-[#e5e6ef] bg-[#f5f7fb]"
        }`}
      >
        {checked ? <CheckIcon color="#ffffff" /> : null}
      </span>

      <span className="flex min-w-0 flex-1 items-center gap-[7px]">
        <GroupAvatar group={group} />
        <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <span className="min-w-0">
            <span className="block text-[15px] leading-[18px] text-[#272727]">
              {group.name}
            </span>
            <span className="block text-[13px] leading-[18px] text-[#272727] opacity-70">
              {group.kind}
            </span>
          </span>
          <span className="shrink-0 text-[15px] leading-[18px] text-[#272727] opacity-70">
            {formatUserCount(group.count)}
          </span>
        </span>
      </span>
    </button>
  );
}

function SelectedChip({
  group,
  onRemove,
}: {
  group: UserGroup;
  onRemove: () => void;
}) {
  const colors = getGroupColor(group.id);

  return (
    <span
      className="inline-flex h-[34px] items-center gap-2 rounded-[10px] pl-3 pr-2 text-[15px] font-medium leading-5"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {group.name}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${group.name}`}
        className="flex size-[15px] items-center justify-center rounded-sm opacity-80 hover:opacity-100"
        style={{ color: colors.text }}
      >
        <ChipRemoveIcon color={colors.text} />
      </button>
    </span>
  );
}

type GrantAccessModalProps = {
  onClose?: () => void;
};

export function GrantAccessModal({ onClose }: GrantAccessModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const selectedGroups = useMemo(
    () =>
      selectedIds
        .map((id) => USER_GROUPS_BY_ID.get(id))
        .filter((group): group is UserGroup => Boolean(group)),
    [selectedIds],
  );

  const visibleGroups = useMemo(() => {
    if (searchQuery.trim()) {
      return filterGroups(searchQuery);
    }
    return getFrequentGroups();
  }, [searchQuery]);

  const listTitle = searchQuery.trim() ? "Search results" : "Frequently selected";
  const hasSelection = selectedIds.length > 0;
  const showConfirmOverlay = showDeactivateConfirm || showCancelConfirm;

  function toggleGroup(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function removeGroup(id: string) {
    setSelectedIds((current) => current.filter((item) => item !== id));
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="grant-access-title"
      className="relative flex h-[566px] w-full max-w-[688px] flex-col overflow-hidden rounded-[24px] border border-[#e5e6ef] bg-white shadow-[0px_5px_10px_0px_rgba(0,0,0,0.1)]"
    >
      <div
        className={`flex min-h-0 flex-1 flex-col ${
          showConfirmOverlay ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="px-[19px] pt-[19px] pb-[18px]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="grant-access-title"
                className="text-[18px] font-medium leading-5 text-[#272727]"
              >
                ProductivityPlus
              </h2>
              <span className="inline-flex h-[26px] min-w-[55px] items-center justify-center rounded-full bg-[#eaf9ef] px-[7px] text-[13px] font-medium leading-[18px] text-[#249652]">
                Active
              </span>
            </div>
            <p className="text-[15px] leading-[18px] text-[#272727] opacity-70">
              Advanced productivity tools for presentations
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="-translate-y-[2px] flex items-center gap-[5px] text-[15px] font-medium leading-[18px] text-[#272727]"
            >
              Help center
              <ExternalLinkIcon />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="flex size-[30px] items-center justify-center rounded-[10px] border border-[#e5e6ef] bg-[#f5f7fb] hover:bg-[#eef1f7]"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#e5e6ef]" />

      <div className="flex flex-1 flex-col overflow-hidden px-[19px] pt-6">
        <div className="space-y-2">
          <h3 className="text-[18px] font-medium leading-5 text-[#272727]">
            Grant access
          </h3>
          <p className="max-w-[554px] text-[15px] leading-[18px] text-[#272727] opacity-70">
            The users and groups added below will be granted access to this
            functionality.
          </p>
        </div>

        <label
          htmlFor="user-search"
          className="mt-7 block text-[15px] font-medium leading-[18px] text-[#272727]"
        >
          Select users <span className="text-[#bb1919]">*</span>
        </label>

        <div className="relative mt-2">
          <div className="flex h-[44px] items-center rounded-[10px] border border-[#e5e6ef] bg-[#f5f7fb] pl-[38px] pr-3">
            <input
              id="user-search"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search for users or user groups"
              className="w-full bg-transparent text-[15px] leading-[18px] text-[#272727] outline-none placeholder:text-[#95969d]"
            />
          </div>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
        </div>

        {selectedGroups.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedGroups.map((group) => (
              <SelectedChip
                key={group.id}
                group={group}
                onRemove={() => removeGroup(group.id)}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex min-h-0 flex-1 flex-col">
          <p className="text-[15px] font-medium leading-[18px] text-[#272727]">
            {listTitle}
          </p>
          <div className="mt-[15px] space-y-4 overflow-y-auto pb-4">
            {visibleGroups.map((group) => (
              <GroupListItem
                key={group.id}
                group={group}
                checked={selectedIds.includes(group.id)}
                onToggle={() => toggleGroup(group.id)}
              />
            ))}
            {searchQuery.trim() && visibleGroups.length === 0 ? (
              <p className="text-[15px] leading-[18px] text-[#95969d]">
                No users or groups found.
              </p>
            ) : null}
          </div>
        </div>
      </div>
      </div>

      {showDeactivateConfirm ? (
        <div className="relative z-10 flex h-[61px] shrink-0 items-center border-t border-[#e5e6ef] bg-white px-[18px]">
          <div className="flex items-center gap-[10px]">
            <ExclamationIcon />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[15px] font-medium leading-5 text-[#272727]">
                Are you sure you want to deactivate the module?
              </p>
              <p className="text-[15px] leading-[18px] text-[#272727]">
                All granted access will be lost
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {showCancelConfirm ? (
        <div className="relative z-10 flex h-[61px] shrink-0 items-center border-t border-[#e5e6ef] bg-white px-[18px]">
          <div className="flex items-center gap-[10px]">
            <ExclamationIcon />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[15px] font-medium leading-5 text-[#272727]">
                Discard unsaved changes?
              </p>
              <p className="text-[15px] leading-[18px] text-[#272727]">
                All changes will be lost
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative z-10 flex h-16 items-center border-t border-[#e5e6ef] bg-[#f5f7fb] pl-[25px] pr-[18px]">
        {showDeactivateConfirm ? (
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowDeactivateConfirm(false)}
              className="text-[15px] font-medium leading-5 text-[#272727]"
            >
              Keep
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-[34px] w-[102px] items-center justify-center rounded-[10px] bg-[#bb1919] text-[15px] font-medium leading-5 text-white hover:opacity-90"
            >
              Deactivate
            </button>
          </div>
        ) : showCancelConfirm ? (
          <div className="ml-auto flex items-center gap-[23px]">
            <button
              type="button"
              onClick={() => setShowCancelConfirm(false)}
              className="text-[15px] font-medium leading-5 text-[#272727]"
            >
              Keep editing
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-[34px] w-[144px] items-center justify-center rounded-[10px] bg-[#202020] text-[15px] font-medium leading-5 text-white hover:opacity-90"
            >
              Discard changes
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setShowCancelConfirm(false);
                setShowDeactivateConfirm(true);
              }}
              className="text-[15px] font-medium leading-5 text-[#bb1919]"
            >
              Deactivate module
            </button>
            <div className="ml-auto flex items-center gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowDeactivateConfirm(false);
                  setShowCancelConfirm(true);
                }}
                className="text-[15px] font-medium leading-5 text-[#272727]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!hasSelection}
                className={`flex h-[34px] w-[124px] items-center justify-center rounded-[10px] bg-[#202020] text-[15px] font-medium leading-5 text-white ${
                  hasSelection
                    ? "hover:opacity-90"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                Save changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const USER_GROUPS_BY_ID = new Map(
  USER_GROUPS.map((group) => [group.id, group]),
);
