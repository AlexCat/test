import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useDropzone, DropzoneProps as OriginalDropzoneProps } from 'react-dropzone'
import { FormattedMessage, useIntl } from 'react-intl'

import { notify } from 'kit/notify'
import { ReactComponent as CloseIcon } from 'assets/images/close.svg'
import { getFileId, mergeFilesForDropzone, formatBytes } from 'utils'

type DropzoneProps = {
    fileList: File[],
    onFileRemove: (file: File) => void
    onFilesSet: (files: File[]) => void
    disabled?: boolean
    intent?: Intent
    areaMessage: React.ReactNode
    containerRef?: React.LegacyRef<HTMLDivElement>
    validate?: (files: File[]) => boolean
} & Pick<OriginalDropzoneProps, 'accept' | 'maxSize' | 'minSize' | 'maxFiles'>

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {

    }
})

const DropArea = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 108,
        borderWidth: 3,
        borderStyle: 'dashed',
        boxSizing: 'border-box',
        borderRadius: 8,
        cursor: 'pointer',
        transition: '.2s all',
        ':hover': {
            filter: 'brightness(.95)',
        },
    })
})

const DropAreaTitle = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return ({
        fontWeight: 600,
        fontSize: 15,
        lineHeight: '135%',
        color: theme?.colors.color3,
        textAlign: 'center',
        padding: '24px 12px 0 12px',

        [theme!.mq.small]: {
            fontSize: 15,
            lineHeight: '175%',
        }
    })
})

const FilesCondition = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return ({
        fontSize: 12,
        lineHeight: '150%',
        color: theme?.colors.color1,
        textAlign: 'center',
        padding: '0 12px 24px 12px',

        [theme!.mq.small]: {
            fontSize: 15,
            lineHeight: '175%',
        }
    })
})

const FileCard = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return ({
        display: 'flex',
        flexGrow: 1,
        alignItems: 'baseline',
        justifyContent: 'space-between',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        borderRadius: 8,
        fontSize: 15,
        lineHeight: '175%',
        padding: '8px 16px',
    })
})

function Dropzone({
    containerRef,
    fileList,
    onFileRemove,
    onFilesSet,
    disabled,
    maxFiles,
    accept,
    areaMessage,
    minSize,
    validate,
    maxSize = 5242880, // 5 МБ
    intent = 'none'
}: DropzoneProps) {
    const { formatMessage } = useIntl()
    const theme = useTheme()

    const onDropAccepted = React.useCallback((acceptedFiles: File[]) => {
        if (maxFiles && fileList.length + acceptedFiles.length - maxFiles > 0) {
            notify({
                message: formatMessage({ id: 'app.dropzone.filesQuantityLimit' }, { value: maxFiles }),
                type: 'error'
            })
            return
        }

        const isValidByCustomValidation = validate === undefined || validate(acceptedFiles)

        if (!isValidByCustomValidation) {
            return
        }

        const files = mergeFilesForDropzone(fileList, acceptedFiles)
        onFilesSet(files)
    }, [fileList])

    const dropZoneProps = useDropzone({
        accept,
        maxFiles,
        minSize,
        maxSize,
        disabled,
        onDropAccepted,
        onDropRejected: files => {
            let hasTooManyFiles = false
            files.forEach(file => {
                file.errors.forEach(error => {
                    if (error.code === 'file-too-small') {
                        notify({
                            message: formatMessage({ id: 'app.dropzone.fileTooSmall' }, { size: formatBytes(minSize!) }),
                            type: 'error'
                        })
                    }

                    if (error.code === 'file-invalid-type') {
                        notify({
                            message: formatMessage({ id: 'app.dropzone.fileTypeError' }, { type: 'PDF, PNG или JPEG' }),
                            type: 'error'
                        })
                    }
                    if (error.code === 'file-too-large') {
                        notify({
                            message: formatMessage({ id: 'app.dropzone.fileSizeError' }, { size: formatBytes(maxSize!) }),
                            type: 'error'
                        })
                    }
                    if (error.code === 'too-many-files') {
                        hasTooManyFiles = true
                    }
                })
            })

            if (hasTooManyFiles) {
                notify({
                    message: formatMessage({ id: 'app.dropzone.filesQuantityLimit' }, { value: maxFiles }),
                    type: 'error'
                })
            }
        },
    })

    return (
        <Frame ref={containerRef}>
            {
                fileList.length !== 0 && (
                    <div
                        style={{ marginBottom: 24 }}
                    >
                        {
                            fileList.map(x => {
                                return (
                                    <div
                                        key={getFileId(x)}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}
                                    >
                                        <FileCard>
                                            <div style={{ color: '#21A038', display: 'flex', flexGrow: 1, overflow: 'hidden', marginRight: 12 }}>
                                                <span style={{ wordBreak: 'break-all' }}>
                                                    {x.name}
                                                </span>
                                            </div>
                                            <div style={{ color: '#b5b1b1', display: 'flex', flexShrink: 0 }}>
                                                {formatBytes(x.size)}
                                            </div>
                                        </FileCard>
                                        <CloseIcon
                                            style={{ cursor: 'pointer', width: 50 }}
                                            onClick={e => {
                                                onFileRemove(x)
                                            }}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            <DropArea
                {...dropZoneProps.getRootProps({ style: { borderColor: dropZoneProps.isDragActive ? theme.colors.color3 : theme.colors.color12 } })}
            >
                <input {...dropZoneProps.getInputProps()} />

                <DropAreaTitle>
                    <FormattedMessage id='app.dropzone.title' />
                </DropAreaTitle>
                <FilesCondition>
                    {areaMessage}
                </FilesCondition>
            </DropArea>
        </Frame>
    )
}

export {
    Dropzone
}