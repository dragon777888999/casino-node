export default (skin_idx) => {
  switch (skin_idx) {
    // space skin (purple)
    case 2:
      return {
        // web graph colors
        green_web_box_colors: {
          colors: {
            stop_1: "rgba(0, 255, 147, 0)",
            stop_2: "rgba(0, 255, 147, 0.25)",
            stop_3: "#00ff93"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "20%",
            stop_3: "100%",
          }
        },
        red_web_box_colors: {
          colors: {
            stop_1: "#ff0051",
            stop_2: "rgba(255, 0, 81, 0.25)",
            stop_3: "rgba(255, 0, 81, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "80%",
            stop_3: "100%",
          }
        },

        // mobile graph colors
        green_mobile_box_colors: {
          colors: {
            stop_1: "rgba(0, 255, 147, 0)",
            stop_2: "rgba(0, 255, 147, 0.25)",
            stop_3: "#00ff93"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "16%",
            stop_3: "100%",
          }
        },
        red_mobile_box_colors: {
          colors: {
            stop_1: "#ff0051",
            stop_2: "rgba(255, 0, 81, 0.25)",
            stop_3: "rgba(255, 0, 81, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "84%",
            stop_3: "100%",
          }
        },

        round_vertical_start_line: "#fff",
        round_vertical_end_line: "#fff",
        start_flag_color: "#fff",
        end_flag_color: "#fff",
        main_graph_color: "#fff",
        current_rate_horizontal_color: "#fff",
        current_rate_circle_color: "#fff",
        grid_web_color: "#fff",
        grid_mobile_color: "#fff",

        // 'live bitcoin' container
        current_rate_header_bg: "#835aea",
        current_rate_header_border: "#835aea",
        current_rate_header_font_color: "#fff",

        current_rate_txt_up: "#00ff93",
        current_rate_txt_tie: "#868686",
        current_rate_txt_down: "#ff0051",

        // current rate under 'live bitcoin'
        current_rate_txt_bg: "#22224b",
        current_rate_txt_font_size: "#fff",
        current_rate_txt_border: "#22224b",

        // start rate -container
        start_rate_header_font_color: "#fff",
        start_rate_header_bg: "#835aea",
        start_rate_header_border: "#835aea",

        // start rate container
        start_rate_font_color: "#fff",
        start_rate_bg: "#10102f",

        // candles colors
        candles_up_color: '#fff',
        candles_down_color: '#8158e7',
      };

    // red/blue (police)
    case 3:
      return {
        // web graph colors
        green_web_box_colors: {
          colors: {
            stop_1: "rgba(45, 72, 247, 0)",
            stop_2: "rgba(45, 72, 247, .1)",
            stop_3: "rgba(45, 72, 247, .6)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "70%",
            stop_3: "100%",
          }
        },
        red_web_box_colors: {
          colors: {
            stop_1: "rgba(255, 24, 62, .6)",
            stop_2: "rgba(255, 24, 62, .1)",
            stop_3: "rgba(255, 24, 62, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "30%",
            stop_3: "100%",
          }
        },

        // mobile graph colors
        green_mobile_box_colors: {
          colors: {
            stop_1: "rgba(45, 72, 247, 0)",
            stop_2: "rgba(45, 72, 247, 0.25)",
            stop_3: "#2d48f7"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "84%",
            stop_3: "100%",
          }
        },
        red_mobile_box_colors: {
          colors: {
            stop_1: "#ff183e",
            stop_2: "rgba(255, 24, 62, 0.25)",
            stop_3: "rgba(255, 24, 62, 0)",
          },
          percentage: {
            stop_1: "0%",
            stop_2: "16%",
            stop_3: "100%",
          }
        },

        round_vertical_start_line: "#2d48f7",
        round_vertical_end_line: "#2d48f7",
        start_flag_color: "#2d48f7",
        end_flag_color: "#2d48f7",
        main_graph_color: "#2d48f7",
        current_rate_horizontal_color: "#f0f0ff",
        current_rate_circle_color: "#2d48f7",
        grid_web_color: "#2f244e",
        grid_mobile_color: "#2f244e",

        // 'live bitcoin' container
        current_rate_header_bg: "#f7931b",
        current_rate_header_border: "#f7931b",
        current_rate_header_font_color: "#fff",

        current_rate_txt_up: "#fff",
        current_rate_txt_tie: "#fff",
        current_rate_txt_down: "#fff",

        // current rate under 'live bitcoin'
        current_rate_txt_bg: "#2d48f7",
        current_rate_txt_font_size: "#fff",
        current_rate_txt_border: "#2d48f7",

        // start rate -container
        start_rate_header_font_color: "#fff",
        start_rate_header_bg: "#f7931b",
        start_rate_header_border: "#f7931b",

        // start rate container
        start_rate_font_color: "#fff",
        start_rate_bg: "#2d48f7",

        // candles colors
        candles_up_color: '#77ff00',
        candles_down_color: '#ff3355',
      };

    // cryptofights-pro (green/red)
    case 4:
      return {
        // web graph colors
        green_web_box_colors: {
          colors: {
            stop_1: "rgba(174, 248, 59, 0.25)",
            stop_2: "rgba(174, 248, 59, 0.28)",
            stop_3: "#aef83b"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "20%",
            stop_3: "100%",
          }
        },
        red_web_box_colors: {
          colors: {
            stop_1: "#ff3d17",
            stop_2: "rgba(255, 61, 23, 0.25)",
            stop_3: "rgba(255, 61, 23, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "80%",
            stop_3: "100%",
          }
        },

        // mobile graph colors
        green_mobile_box_colors: {
          colors: {
            stop_1: "rgba(174, 248, 59, 0)",
            stop_2: "rgba(174, 248, 59, 0.25)",
            stop_3: "#aef83b"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "16%",
            stop_3: "100%",
          }
        },
        red_mobile_box_colors: {
          colors: {
            stop_1: "#ff3d17",
            stop_2: "rgba(255, 61, 23, 0.25)",
            stop_3: "rgba(255, 61, 23, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "84%",
            stop_3: "100%",
          }
        },

        round_vertical_start_line: "#fff",
        round_vertical_end_line: "#fff",
        start_flag_color: "#fff",
        end_flag_color: "#fff",
        main_graph_color: "#fff",
        current_rate_horizontal_color: "#fff",
        current_rate_circle_color: "#fff",
        grid_web_color: "#fff",
        grid_mobile_color: "#fff",

        // 'live bitcoin' container
        current_rate_header_bg: "rgba(19, 19, 19, 0.99)",
        current_rate_header_border: "rgba(19, 19, 19, 0.99)",
        current_rate_header_font_color: "#fff",

        current_rate_txt_up: "#aef83b",
        current_rate_txt_tie: "#868686",
        current_rate_txt_down: "#ff3d17",

        // current rate under 'live bitcoin'
        current_rate_txt_bg: "rgba(19, 19, 19, 0.99)",
        current_rate_txt_font_size: "#fff",
        current_rate_txt_border: "rgba(19, 19, 19, 0.99)",

        // start rate -container
        start_rate_header_font_color: "#fff",
        start_rate_header_bg: "rgba(19, 19, 19, 0.99)",
        start_rate_header_border: "rgba(19, 19, 19, 0.99)",

        // start rate container
        start_rate_font_color: "#fff",
        start_rate_bg: "rgba(19, 19, 19, 0.99)",

        // candles colors
        candles_up_color: '#fff',
        candles_down_color: '#171717',
      };

    // cryptofights-pro (green/red)
    case 5:
      return {
        // web graph colors
        green_web_box_colors: {
          colors: {
            stop_1: "rgba(174, 248, 59, 0.25)",
            stop_2: "rgba(174, 248, 59, 0.28)",
            stop_3: "#aef83b"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "20%",
            stop_3: "100%",
          }
        },
        red_web_box_colors: {
          colors: {
            stop_1: "#ff3d17",
            stop_2: "rgba(255, 61, 23, 0.25)",
            stop_3: "rgba(255, 61, 23, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "80%",
            stop_3: "100%",
          }
        },

        // mobile graph colors
        green_mobile_box_colors: {
          colors: {
            stop_1: "rgba(174, 248, 59, 0)",
            stop_2: "rgba(174, 248, 59, 0.25)",
            stop_3: "#aef83b"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "16%",
            stop_3: "100%",
          }
        },
        red_mobile_box_colors: {
          colors: {
            stop_1: "#ff3d17",
            stop_2: "rgba(255, 61, 23, 0.25)",
            stop_3: "rgba(255, 61, 23, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "84%",
            stop_3: "100%",
          }
        },

        round_vertical_start_line: "#fff",
        round_vertical_end_line: "#fff",
        start_flag_color: "#fff",
        end_flag_color: "#fff",
        main_graph_color: "#fff",
        current_rate_horizontal_color: "#fff",
        current_rate_circle_color: "#fff",
        grid_web_color: "#fff",
        grid_mobile_color: "#fff",

        // 'live bitcoin' container
        current_rate_header_bg: "rgba(19, 19, 19, 0.99)",
        current_rate_header_border: "rgba(19, 19, 19, 0.99)",
        current_rate_header_font_color: "#fff",

        current_rate_txt_up: "#aef83b",
        current_rate_txt_tie: "#868686",
        current_rate_txt_down: "#ff3d17",

        // current rate under 'live bitcoin'
        current_rate_txt_bg: "rgba(19, 19, 19, 0.99)",
        current_rate_txt_font_size: "#fff",
        current_rate_txt_border: "rgba(19, 19, 19, 0.99)",

        // start rate -container
        start_rate_header_font_color: "#fff",
        start_rate_header_bg: "rgba(19, 19, 19, 0.99)",
        start_rate_header_border: "rgba(19, 19, 19, 0.99)",

        // start rate container
        start_rate_font_color: "#fff",
        start_rate_bg: "rgba(19, 19, 19, 0.99)",

        // candles colors
        candles_up_color: '#fff',
        candles_down_color: '#171717',
      };

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    





    
    
    
    
    










      // bitfight.com
    case 6:
      return {
        // web graph colors
        green_web_box_colors: {
          colors: {
            // stop_1: "rgba(110, 192, 23, 0)",
            // stop_2: "rgba(110, 192, 23, 0.45)",
            stop_1: "rgba(0, 0, 0, 0)",
            stop_2: "rgba(0, 0, 0, 0)",
            stop_3: "rgba(110, 192, 23, 0.6)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "20%",
            stop_3: "100%",
          }
        },
        red_web_box_colors: {
          colors: {
            // stop_1: "rgba(247, 1, 60, 0.6)",
            // stop_2: "rgba(247, 1, 60, 0.25)",
            stop_1: "rgba(247, 1, 60, 0.6)",
            stop_2: "rgba(0, 0, 0, 0)",
            stop_3: "rgba(0, 0, 0, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "80%",
            stop_3: "100%",
          }
        },

        // mobile graph colors
        green_mobile_box_colors: {
          colors: {
            // stop_1: "rgba(174, 248, 59, 0)",
            // stop_2: "rgba(174, 248, 59, 0.25)",
            // stop_3: "#aef83b"
            stop_1: "rgba(0, 0, 0, 0)",
            stop_2: "rgba(0, 0, 0, 0)",
            stop_3: "rgba(110, 192, 23, 0.6)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "16%",
            stop_3: "100%",
          }
        },
        red_mobile_box_colors: {
          colors: {
            // stop_1: "#ff3d17",
            // stop_2: "rgba(255, 61, 23, 0.25)",
            // stop_3: "rgba(255, 61, 23, 0)"
            stop_1: "rgba(247, 1, 60, 0.6)",
            stop_2: "rgba(0, 0, 0, 0)",
            stop_3: "rgba(0, 0, 0, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "84%",
            stop_3: "100%",
          }
        },

        round_vertical_start_line: "#827a78",
        round_vertical_end_line: "#827a78",
        start_flag_color: "#827a78",
        end_flag_color: "#827a78",
        main_graph_color: "#aef83b",
        current_rate_horizontal_color: "#aef83b",
        current_rate_circle_color: "#f4d56f",
        grid_web_color: "#fff",
        grid_mobile_color: "#fff",

        grid_rows_left_val: -.01,
        axisLabelStyle: {
          dx: '-0.45em',
          dy: '0.25em',
          fontSize: '.8em',
          fontFamily: 'Manrope',
          textAnchor: 'end',
          fill: 'rgba(255, 255, 255, 0.2)'
        },

        grid_rows_left_val_mobile: -.06,
        axisLabelStylePortrait: {
          dx: '-0.25em',
          dy: '0.25em',
          fontSize: '.96em',
          fontFamily: 'Manrope',
          textAnchor: 'end',
          fill: 'rgba(255, 255, 255, 0.2)'
        },

        // CURRENT RATE (HEADER TEXT)
        current_rate_header_box_width: 7.5,
        current_rate_header_dy: "0.4em",
        current_rate_header_font_family: "Manrope",
        current_rate_header_font_size: "0.6em",
        current_rate_header_font_weight: 800,
        current_rate_header_font_color: "rgba(26, 63, 68, 0.8)",
        current_rate_header_bg: "#ffffffcc",
        current_rate_header_border: "rgba(0, 0, 0, 0)",

        // CURRENT RATE (NUMBER)
        current_rate_font_family: "Bruno Ace",

        current_rate_font_size: "0.9em",
        current_rate_font_size_mobile: "1.2em",

        current_rate_dy: "0.5em",
        current_rate_dy_mobile: "0.7em",

        current_rate_txt_up: "#9eff23",
        current_rate_txt_tie: "#868686",
        current_rate_txt_down: "#ff003d",
        current_rate_txt_bg: "rgba(0, 0, 0, 0.5)",
        current_rate_txt_font_size: "#fff",
        current_rate_txt_border: "rgba(0, 0, 0, 0.5)",

        // CURRENT RATE (LINE)
        current_rate_line_thickness: .14,

        // START RATE (HEADER TEXT)
        start_rate_header_box_width: 7.5,
        start_rate_header_dy: "0.4em",
        start_rate_header_font_family: "Manrope",
        start_rate_header_font_size: "0.6em",
        start_rate_header_font_weight: 600,
        start_rate_header_font_color: "#90928e",
        start_rate_header_bg: "#102027",
        start_rate_header_border: "#102027",

        // START RATE (NUMBER)
        start_rate_font_family: "Bruno Ace",

        start_rate_font_size: "0.9em",
        start_rate_font_size_mobile: "1.2em",

        start_rate_dy: "0.5em",
        start_rate_dy_mobile: "0.7em",

        start_rate_font_color: "#fff",
        start_rate_bg: "rgba(0, 0, 0, 0.5)",
        start_rate_txt_border: "rgba(0, 0, 0, 0)",

        // START RATE (LINE)
        start_rate_line_opacity: .8,
        start_rate_line_thickness: .14,

        // candles colors
        candles_up_color: '#6bbf17',
        candles_down_color: '#ff003d'

      };





































    default:
      return {
        // web graph colors
        green_web_box_colors: {
          colors: {
            stop_1: "#3d430f",
            stop_2: "#505e0c",
            stop_3: "#8baf03"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "20%",
            stop_3: "100%",
          }
        },
        red_web_box_colors: {
          colors: {
            stop_1: "#e81108",
            stop_2: "#a0180e",
            stop_3: "#83110b",
          },
          percentage: {
            stop_1: "0%",
            stop_2: "80%",
            stop_3: "100%",
          }
        },

        // mobile graph colors
        green_mobile_box_colors: {
          colors: {
            stop_1: "rgba(157, 200, 0, 0)",
            stop_2: "rgba(157, 200, 0, 0.25)",
            stop_3: "#9dc800",
          },
          percentage: {
            stop_1: "0%",
            stop_2: "16%",
            stop_3: "100%",
          }
        },
        red_mobile_box_colors: {
          colors: {
            stop_1: "#ff0300",
            stop_2: "rgba(255, 3, 0, 0.25)",
            stop_3: "rgba(237, 4, 1, 0)"
          },
          percentage: {
            stop_1: "0%",
            stop_2: "84%",
            stop_3: "100%",
          }
        },

        round_vertical_start_line: "#f4d56f",
        round_vertical_end_line: "#f4d56f",
        start_flag_color: "#f4d56f",
        end_flag_color: "#f4d56f",
        main_graph_color: "#f4d56f",
        current_rate_horizontal_color: "#f4d56f",
        current_rate_circle_color: "#f4d56f",
        grid_web_color: "#fff",
        grid_mobile_color: "#7c7c7c",

        // 'live bitcoin' container
        current_rate_header_bg: "#f4d56f",
        current_rate_header_border: "#f4d56f",
        current_rate_header_font_color: "#000",

        current_rate_txt_up: "#81c802",
        current_rate_txt_tie: "#868686",
        current_rate_txt_down: "#e02e2b",

        // current rate under 'live bitcoin'
        current_rate_txt_bg: "#151513",
        current_rate_txt_font_size: "#f4d56f",
        current_rate_txt_border: "#f4d56f",

        // start rate -container
        start_rate_header_font_color: "#000",
        start_rate_header_bg: "#f4d56f",
        start_rate_header_border: "#f4d56f",

        // start rate container
        start_rate_font_color: "#f4d56f",
        start_rate_bg: "#000",

        // candles colors
        candles_up_color: '#77ff00',
        candles_down_color: '#ff3355',
      };
  }
};
