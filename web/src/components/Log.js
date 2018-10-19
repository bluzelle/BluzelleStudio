import {log} from '../services/BluzelleService'

log.observe(v => {

    if(logs.length === logs_max_length) {
        logs.shift();
    }

    logs.push(v.newValue);

});


const logs_max_length = 5;
const logs = observable([]);


@observer
export class Log extends Component {

    render() {

        return (
            <div style={{
                padding: 10,
                fontFamily: "monospace",
                background: "#EEE",
                wordBreak: "break-all",
            }}>

                {logs.reverse().map((msg, i) =>

                    <div key={i} style={{
                        margin: 10,
                        padding: 10,
                        borderLeft: "1px solid black"
                    }}>

                        {msg.map((point, i) => 

                            <div key={i}>{JSON.stringify(point)}</div>
                        
                        )}
                    </div>

                )}
            </div>
        );
    }
}
