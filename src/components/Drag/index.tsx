import React, { useState, useEffect, useRef, Children } from 'react'

import styles from './index.module.scss'

interface Data {
  id: number
  name: string
  age: string
  msg: string
}
const Item = (props: { data: Data[] }) => {
  const { data } = props
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Name</span>
        <span>Age</span>
        <span>Message</span>
      </div>
      {data.map((item, index) => {
        return (
          <li className={styles.item} key={index}>
            <span>{item.name}</span>
            <span>{item.age}</span>
            <span>{item.msg}</span>
          </li>
        )
      })}
    </div>
  )
}

let startIndex: number
let endIndex: number

const Drop = (props: {
  children: any
  dataSource: Data[]
  onDropSuccess: (val: Data[]) => void
}) => {
  const { children, dataSource, onDropSuccess } = props
  const data: Data[] = dataSource.slice()

  useEffect(() => {
    console.warn('dataSource', dataSource)
  }, [dataSource])

  const swap = (arr: any[], start: number, end: number) => {
    ;[arr[start], arr[end]] = [arr[end], arr[start]]
  }
  const reorder = (arr: any[], start: number, end: number) => {
    const result = Array.from(arr)
    const [removed] = result.splice(start, 1)
    result.splice(end, 0, removed)
    return result
  }

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    startIndex = index
    console.log(' handleDragStart')

    e.currentTarget.classList.add('curr')
  }
  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault()
    endIndex = index
    console.log('onDragEnter')
    swap(data, startIndex, endIndex)
    console.log(data, startIndex, endIndex)
    onDropSuccess(data)
  }
  const handleDragEnd = (e: { preventDefault: any; currentTarget: any }) => {
    e.preventDefault()
    e.currentTarget.classList.remove('curr')
  }
  const handleDragLeave = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault()
    endIndex = index
    console.log('handleDragLeave')
    swap(data, startIndex, endIndex)
    onDropSuccess(data)
  }
  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault()
    endIndex = index
    swap(data, startIndex, endIndex)
    console.log('handleDrop', data, startIndex, endIndex)
    onDropSuccess(data)
  }
  const uiList = () => {
    console.log('uilist')

    return children.map((item: any, index: number) => {
      return {
        ...item,
        props: {
          ...item.props,
          draggable: true,
          onDragStart: (e: React.DragEvent<HTMLLIElement>) => handleDragStart(e, index),
          // onDragEnter: (e: React.DragEvent<HTMLLIElement>) => handleDragEnter(e, index),
          onDragOver: (e: { preventDefault: () => void }) => {
            e.preventDefault()
          },
          onDrop: (e: React.DragEvent<HTMLLIElement>) => handleDrop(e, index),
          // onDragLeave: (e: React.DragEvent<HTMLLIElement>) => handleDragLeave(e, index),
          onDragEnd: (e: {
            preventDefault: () => void
            currentTarget: { classList: { remove: (arg0: string) => void } }
          }) => handleDragEnd(e)
        }
      }
    })
  }

  return (
    <>
      {uiList()}
      {/* {children} */}
    </>
  )
}

const Main = () => {
  const state = [
    {
      id: 1,
      name: 'Joye',
      age: '25',
      msg: 'i am a girl'
    },
    {
      id: 2,
      name: 'Cooper',
      age: '28',
      msg: 'i am a boy'
    },
    {
      id: 3,
      name: 'Bob',
      age: '18',
      msg: 'i am a cat'
    }
  ]
  const [dataMain, setDataMain] = useState<Data[]>(state)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Name</span>
          <span>Age</span>
          <span>Message</span>
        </div>
        <Drop
          dataSource={dataMain}
          onDropSuccess={(newVal: React.SetStateAction<Data[]>) => {
            console.warn('newVal', newVal)
            setDataMain(newVal)
          }}
        >
          {dataMain.map(item => {
            return (
              <li className={styles.item} key={item.id}>
                <span>{item.name}</span>
                <span>{item.age}</span>
                <span>{item.msg}</span>
              </li>
            )
          })}
        </Drop>
      </div>
    </>
  )
}

export default Main
