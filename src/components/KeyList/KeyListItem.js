import React, { useEffect, useState } from "react"

import useCRUDService from "../../services/CRUDService"
import useCommandQueueService from "../../services/CommandQueueService"

import loadingBar from "../loadingBar"
import useData from "components/DataContext/useData"

const KeyListItem = ({ keyname, style, info }) => {
    const { selectedKey, setSelectedKey, tempKeys } = useData()
    const [expiring, setExpiring] = useState(false)
    const { execute } = useCommandQueueService()
    const { rename } = useCRUDService()

    const select = (target) => {
        const old = selectedKey

        execute({
            doIt: () => Promise.resolve(setSelectedKey(target)),
            undoIt: () => Promise.resolve(setSelectedKey(old)),
            message: (
                <span>
                    Selected <code key={1}>{target}</code>.
                </span>
            ),
        })
    }

    const renameKey = (newKey) => {
        execute({
            doIt: () => rename(keyname, newKey),
            undoIt: () => rename(newKey, keyname),
            message: (
                <span>
                    Renamed <code key={1}>{keyname}</code> to{" "}
                    <code key={2}>{newKey}</code>.
                </span>
            ),
        })
    }

    useEffect(() => {
        const curTime = new Date()
        const leftLease = info.updatedAt
            ? info.lease - (curTime.getTime() - info.updatedAt.getTime()) / 1000
            : -1

        console.log(info.key, leftLease)
        if (leftLease > 0 && leftLease < 3600) {
            setExpiring(true)
        } else if (leftLease >= 3600) {
            setExpiring(false)
        }

        if (leftLease > 0 && leftLease < 3600 * 24) {
            setTimeout(() => {
                setExpiring(true)
            }, (leftLease - 3600) * 1000)
        }
    }, [info.updatedAt, info.lease])

    return (
        <BS.ListGroupItem
            style={style}
            onClick={() => {
                if (tempKeys.includes(keyname)) return

                selectedKey === keyname ? select(undefined) : select(keyname)
            }}
            active={selectedKey === keyname}>
            <span
                style={
                    expiring
                        ? {
                              animationDuration: "500ms",
                              animationName: "blink",
                              animationIterationCount: "infinite",
                              animationDirection: "alternate",
                              marginLeft: 15,
                          }
                        : { marginLeft: 15 }
                }>
                {keyname}
            </span>

            {tempKeys.includes(keyname) && loadingBar}

            {keyname === selectedKey && (
                <i
                    style={{
                        float: "right",
                        lineHeight: "24px",
                    }}
                    className='fas fa-chevron-right'></i>
            )}
        </BS.ListGroupItem>
    )
}

export default KeyListItem
