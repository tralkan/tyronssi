import { useStore } from 'effector-react'
import {
    $investorItems,
    $modalInvestor,
    updateInvestorModal,
} from '../../../src/store/modal'
import CloseReg from '../../../src/assets/icons/ic_cross.svg'
import CloseBlack from '../../../src/assets/icons/ic_cross_black.svg'
import stylesDark from './styles.module.scss'
import stylesLight from './styleslight.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import * as tyron from 'tyron'
import { useSelector } from 'react-redux'
import { RootState } from '../../../src/app/reducers'
import Spinner from '../../Spinner'

function Component() {
    const modalInvestor = useStore($modalInvestor)
    const investorItems = useStore($investorItems)
    const net = useSelector((state: RootState) => state.modal.net)
    const isLight = useSelector((state: RootState) => state.modal.isLight)
    const styles = isLight ? stylesLight : stylesDark
    const Close = isLight ? CloseBlack : CloseReg

    const [showMsgBlock, setShowMsgBlock] = useState(false)
    const [loadingBlock, setLoadingBlock] = useState(true)
    const [currentBlock, setCurrentBlock] = useState<any>(null)

    const getBlockChainInfo = () => {
        let network = tyron.DidScheme.NetworkNamespace.Mainnet
        if (net === 'testnet') {
            network = tyron.DidScheme.NetworkNamespace.Testnet
        }
        const init = new tyron.ZilliqaInit.default(network)
        init.API.blockchain.getBlockChainInfo().then((res) => {
            setCurrentBlock(Number(res.result?.CurrentMiniEpoch))
            if (investorItems) {
                if (
                    Number(investorItems[0]) <
                    Number(res.result?.CurrentMiniEpoch)
                ) {
                    setShowMsgBlock(true)
                }
            }
            setLoadingBlock(false)
        })
    }

    useEffect(() => {
        getBlockChainInfo()
    })

    if (!modalInvestor) {
        return null
    }

    return (
        <>
            <div
                onClick={() => updateInvestorModal(false)}
                className={styles.outerWrapper}
            />
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.headerWrapper}>
                        <div
                            onClick={() => updateInvestorModal(false)}
                            className="closeIcon"
                        >
                            <Image
                                alt="ico-close"
                                src={Close}
                                width={15}
                                height={15}
                            />
                        </div>
                        <h5 className={styles.headerTxt}>Investor account</h5>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.txt}>
                            Current block:{' '}
                            {loadingBlock ? <Spinner /> : currentBlock}
                        </div>
                        <div className={styles.txt} style={{ display: 'flex' }}>
                            Next release block: {investorItems[0]}{' '}
                            {showMsgBlock && (
                                <div className={styles.glow}>
                                    =&gt; You can unlock a quota now by
                                    transferring any amount (for example, 1
                                    TYRON) to another wallet.
                                </div>
                            )}
                        </div>
                        <div className={styles.txt}>
                            Block period: {investorItems[1]}
                        </div>
                        <div className={styles.txt}>
                            Token locked amount:{' '}
                            {Number(investorItems[2] / 1e12).toFixed(2)}
                        </div>
                        <div className={styles.txt}>
                            Token quota:{' '}
                            {Number(investorItems[3] / 1e12).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Component
