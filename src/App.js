import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';


const Ul = styled.ul`
display: grid;
grid-template-columns : repeat(5, 1fr);
gap: 30px;
img {
  width: 100%;
}
`

const BTN = styled.button`
&.off {
  display: none;
}
`

const App = () => {
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [load, setLoad] = useState(true);
  const getData = async () => {
    console.log(0)
    const d = await axios.get(`https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=100&pageNo=${pageNum}&MobileOS=WIN&MobileApp=camping&serviceKey=ywRlJa7ppqDu3r%2BZgaoE4hxgKL03rb%2FZH6YKSCyaOqRJZa%2B7MMiFJBXuSswp2Hph6Go86ji9%2BmET3T%2BKutJnFg%3D%3D&_type=json`);
    const t = await d.data.response.body;
    const r = await t.items.item;
    console.log(r)
    setLoad(true);
    setList(r);
    setTotal(t);
    console.log(1)
    setTimeout(() => setLoad(false), 1000);
    console.log(2)
  }

  useEffect(() => {
    getData();
  }, [pageNum]);


  const test_usecallBack = useCallback(() => {
    console.log(3333333333333)
  }, [pageNum])

  const diviceNum = 100;
  const numArray = parseInt(total.totalCount / diviceNum);

  const nextPage = e => {
    if (pageNum > total.totalCount / diviceNum) {
      return;
    }
    setPageNum(pageNum + 1)
  }
  const prevPage = e => {
    if (pageNum == 1) {
      return;
    }
    setPageNum(pageNum - 1)
  }
  return (
    <>
      {
        load ? <div>LOAD...</div> :
          <div onClick={test_usecallBack}>
            <span>{total.totalCount} {numArray} {pageNum}</span>
            <BTN onClick={nextPage} className={pageNum >= total.totalCount / diviceNum ? `off` : ``}>다음</BTN>
            <ul style={{ display: "flex" }}>
              {
                Array.from({ length: numArray + 1 }).map((_$_, idx) => {
                  return (
                    <li>
                      <button onClick={() => setPageNum(idx + 1)}>{idx + 1}</button>
                    </li>
                  )
                })
              }
            </ul>
            <BTN onClick={prevPage} className={pageNum === 1 ? `off` : ``}>이전</BTN>
            <Ul>
              {
                list.map(it => {
                  return (
                    <li>
                      <figure>
                        <img src={it.firstImageUrl} alt="" />
                      </figure>
                      <div className="tit">
                        {it.facltNm}
                      </div>

                    </li>
                  )
                })
              }
            </Ul>

          </div>
      }
    </>

  )
}

export default App